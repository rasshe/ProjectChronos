
sudo cp -r backend /var/www/backend

cd frontend

npm run-script build
#sudo cp -r build /var/www/Project/frontend
sudo cp -r build /var/www/frontend

#sudo cp -r frontend /var/www/Project/frontend
#sudo cp -r ../django /var/www/django

sudo a2dissite 000-default.conf
sudo a2ensite backend.conf
sudo a2ensite frontend.conf

sudo systemctl reload apache2

