import json
from urllib.parse import parse_qs
from beaker.middleware import SessionMiddleware

# Configuración de sesiones
session_opts = {
    'session.type': 'file',
    'session.cookie_expires': True,
    'session.data_dir': '/tmp/sessions',
    'session.auto': True,
}



application = SessionMiddleware(atiApp, session_opts)

def atiApp(environ, start_response):
    #Punto de entrada de la aplicación WSGI
    status = '200 OK'
    headers = [('Content-Type','text/html'),('Set-Cookie','Hotel?=Trivago')]
    start_response(status,headers)

    path = environ.get('PATH_INFO', '/')

    lang = environ['beaker.session'].get('lang', 'es')

    # Si se cambia el parametro en al URL, actualizarlo
    params = parse_qs(environ.get('QUERY_STRING', ''))
    if 'lang' in params:
        new_lang = params['lang'][0].upper()
        if environ['beaker.session']:
            environ['beaker.session']['lang'] = new_lang
            environ['beaker.session'].save()
        lang = new_lang

    if(path == '/index.py'):
        return renderIndex(environ)

    elif(path == '/somethingelse'):
        return [b'anythingelse']
    
    else:
        return [b'<h1>Fatal Mistake</h1>']



def getProfiles(search=None):
    profiles = json.load(open('data/index.json'))
    if search:
        search = search.lower() 
        profilesSearch = []
        for profile in profiles:
            if search in profile['name'].lower():
                profilesSearch.append(profile)
        profiles = profilesSearch
    return profiles

def getProfileByCI(ci):
     
     return json.load(open(f'{ci}/profile.json'))


def renderIndex(environ):

    profiles = getProfiles()
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
            <script type="text/javascript" src="/data/index.json"></script>
            <script type="text/javascript" src="js/index.js" defer></script>
        </head>
        <body>

            <header>
                <nav>
                    <h1 id="appTitle"></h1>
                    <button id="mobileMenu"><img src="icon/menuIcon.svg"></button>
                    <div id="barraBusqueda">
                        <input id="searchBar" type="search" placeholder="Nombre...">
                        <button id="searchButton" type="submit"></button>
                    </div>
                    <button id="botonUsuario"><p id="profileTextButton"></p><img src="icon/userIcon.svg"></button>
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

    return html.encode('utf-8')