sudo cp backend.conf /etc/apache2/sites-available/backend.conf
sudo cp frontend.conf /etc/apache2/sites-available/frontend.conf



sudo a2dissite backend.conf
sudo a2dissite frontend.conf


sudo a2ensite backend.conf
sudo a2ensite frontend.conf

sudo apachectl configtest

sudo systemctl reload apache2