def application(environ, start_response):
    status = '200 OK'
    headers = [('Content-Type','text/html'),('Set-Cookie','cu=ca')]
    start_response(status,headers)

    path = environ.get('PATH_INFO', '/')

    if(path == '/index.py'):
        return [b'index']

    elif(path == '/somethingelse'):
        return [b'anythingelse']
    
    else:
        return [b'<h1>Fatal Mistake</h1>']
    
