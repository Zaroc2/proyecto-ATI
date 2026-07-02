import sys
import json
from urllib.parse import parse_qs
from beaker.middleware import SessionMiddleware

# Configuración de sesiones
session_opts = {
    'session.type': 'file',
    'session.cookie_expires': True,
    'session.data_dir': '/tmp/sessions',
    'session.auto': True,
    'session.cookie_path': '/',   # <--- Para que las cookies se guarden en /
}




def atiApp(environ, start_response):
    #Punto de entrada de la aplicación WSGI

    # Obtener la ruta de la solicitud
    path = environ.get('PATH_INFO', '/')

    # Obtener el idioma de la sesión o establecerlo en 'ES' por defecto
    lang = environ['beaker.session'].get('lang', 'ES')

    # Si se cambia el parametro en al URL, actualizarlo
    params = parse_qs(environ.get('QUERY_STRING', ''))
    if 'lang' in params:
        new_lang = params['lang'][0].upper()
        if environ['beaker.session']:
            environ['beaker.session']['lang'] = new_lang
            environ['beaker.session'].save()
        lang = new_lang
    if(path == '/index.py'):
        start_response('200 OK',[('Content-Type','text/html'),('Set-Cookie','lang='+lang+'; Path=/;SameSite=Lax')])
        return renderIndex(environ)
    
    elif(path == '/profiles'):
        search = parse_qs(environ.get('QUERY_STRING', '')).get('search', [None])[0]
        profiles = getProfiles(search)
        start_response('200 OK',[('Content-Type','text/html'),('Set-Cookie','lang='+lang+'; Path=/;SameSite=Lax')])
        return [json.dumps(profiles).encode('utf-8')]
    
    elif(path == '/config'):
        conf = json.load(open(f'/var/www/html/conf/config{lang}.json'))
        start_response('200 OK',[('Content-Type','text/html'),('Set-Cookie','lang='+lang+'; Path=/;SameSite=Lax')])
        return [json.dumps(conf).encode('utf-8')]

    elif(path == '/somethingelse'):
        return [b'anythingelse']
    
    elif(path == '/p'):
        ci = params.get('ci', [''])[0]
        session = environ['beaker.session']
        session['ci'] = ci
        session.save()
        start_response('200 OK', [
            ('Content-Type', 'text/html'),
            ('Set-Cookie', f'lang={lang}; Path=/'),
            ('Set-Cookie', f'ci={ci}; Path=/')
        ])
        return renderProfile(environ)

    elif(path == '/pdata'):
        session = environ['beaker.session']
        print("ID sesión en /pdata:", session.id)
        ci = session.get('ci', 'null')
        print("CI desde sesión en /pdata:", ci)
        if ci == "null":
            start_response('400 Bad Request', [('Content-Type', 'application/json')])
            return [json.dumps({'error': 'CI no encontrado en sesión'}).encode('utf-8')]
        start_response('200 OK', [('Content-Type', 'application/json')])
        return [getProfileByCI(ci).encode('utf-8')]
        
    else:
        return [b'<h1>Fatal Mistake</h1>']



def getProfiles(search=None):
    profiles = json.load(open('/var/www/html/data/index.json'))
    if search:
        search = search.lower() 
        profilesSearch = []
        for profile in profiles:
            if search in profile['name'].lower():
                profilesSearch.append(profile)
        profiles = profilesSearch
    return profiles

def getProfileByCI(ci):
    data = json.load(open(f'/var/www/html/{ci}/profile.json'))
    return json.dumps(data)


def renderIndex(environ):

    html = '''
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="icon" sizes="32x32" href="/icon/cropped-logonuevo-32x32.png">
            <link rel="icon" sizes="192x192" href="/icon/cropped-logonuevo-192x192.png">
            <link rel="stylesheet" href="/css/style.css">
            <title>ATI[UCV]Log 2026-1</title>
            <script type="text/javascript" src="/js/profile.js" defer></script>
            <script type="text/javascript" src="/js/index.js" defer></script>
        </head>
        <body>

            <header>
                <nav>
                    <a>
                    <h1 id="appTitle"></h1>
                    </a>
                    <button id="mobileMenu"><img src="/icon/menuIcon.svg"></button>
                    <div id="barraBusqueda">
                        <input id="searchBar" type="search" placeholder="Nombre...">
                        <button id="searchButton" type="submit"></button>
                    </div>
                    <button id="botonUsuario"><p id="profileTextButton"></p><img src="/icon/userIcon.svg"></button>
                </nav>
            </header>
            <section>
                <h1 id="semester"></h1>
                <div id="perfiles">
                </div>
                <p id="noResultsText"></p>
            </section>
            <footer >
                <p id="footerText"></p>
            </footer>
            
        </body>
        </html>
    '''

    return [html.encode('utf-8')]

def renderProfile(environ):
    
    html = '''

            <div id="imagenPerfil">
                
            </div>
            
            <div id="informacion">
                <h1 id="title-name"></h1>
                <p id="breve-descripcion-de-mi-persona">
                    
                </p>

                <div id="gustos">
                    <table>
                        <tr>
                            <td id="favorite-color"></td>
                            <td id="favorite-color-data"></td>
                        </tr>
                        <tr>
                            <td id="favorite-book"></td>
                            <td id="favorite-book-data"></td>
                        </tr>
                        <tr>
                            <td id="favorite-music"></td>
                            <td id="favorite-music-data"></td>
                        </tr>
                        <tr>
                            <td id="favorite-game"></td>
                            <td id="favorite-game-data"></td>
                        </tr>
                        <tr>
                                <td id="learnt-languages"><strong></strong> </td>
                                <td id="learnt-languages-data"><strong></strong></td>
                        </tr>

                    </table>
                </div> 
                <p id="email-contact"></p>
            </div>
    '''
    return [html.encode('utf-8')]

application = SessionMiddleware(atiApp, session_opts)
