FROM ubuntu/apache2

RUN apt-get update && apt-get install python3 -y
#Anctualizamos apt-get e instalamos python

RUN apt install apache2 apache2-utils ssl-cert libapache2-mod-wsgi-py3 -y
#Instalamos si no existen ya las cosas de apache y el mod-wsgi

RUN a2enmod wsgi
#Habilitamos el modulo wsgi

RUN echo '<VirtualHost *:80>\n\
    ServerAdmin webmaster@localhost\n\
    DocumentRoot /var/www/html\n\
    ErrorLog ${APACHE_LOG_DIR}/error.log\n\
    CustomLog ${APACHE_LOG_DIR}/access.log combined\n\
    WSGIScriptAlias /ATI /var/www/html/index.py\n\
</VirtualHost>' > /etc/apache2/conf-available/mod-wsgi.conf

RUN a2enconf mod-wsgi

RUN apache2ctl restart

COPY index.py  /var/www/html

EXPOSE 80
