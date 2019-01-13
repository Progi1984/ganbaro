# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|

    # /*=====================================
    # =            FREE VERSION!            =
    # =====================================*/
    # This is the free (still awesome) version of Scotch Box.
    # Please go Pro to support the project and get more features.
    # Check out https://box.scotch.io to learn more. Thanks

    config.vm.box = "scotch/box"
    config.vm.network "private_network", ip: "192.168.33.11"
    config.vm.hostname = "scotchbox"
    config.vm.synced_folder ".", "/var/www", :mount_options => ["dmode=777", "fmode=666"]

    # Optional NFS. Make sure to remove other synced_folder line too
    #config.vm.synced_folder ".", "/var/www", :nfs => { :mount_options => ["dmode=777","fmode=666"] }


    config.vm.provision "shell", inline: <<-SHELL
        sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 4F77679369475BAA
        sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
        sudo add-apt-repository ppa:ondrej/php
        echo '>> sudo apt-get update'
        sudo apt-get update
        echo '>> sudo apt-get -y install php7.2 libapache2-mod-php7.2 libphp7.2-embed libssl-dev openssl php7.2-cgi php7.2-cli php7.2-common php7.2-dev php7.2-fpm php7.2-phpdbg php7.2-xml php7.2-mbstring php7.2-curl php7.2-mysql php7.2-gd php7.2-intl php7.2-zip'
        sudo apt-get -y install php7.2 libapache2-mod-php7.2 libphp7.2-embed libssl-dev openssl php7.2-cgi php7.2-cli php7.2-common php7.2-dev php7.2-fpm php7.2-phpdbg php7.2-xml php7.2-mbstring php7.2-curl php7.2-mysql php7.2-gd php7.2-intl php7.2-zip
        echo '>> sudo a2dismod php7.0'
        sudo a2dismod php7.0
        echo '>> sudo a2enmod php7.2'
        sudo a2enmod php7.2
        echo '>> cd /var/www'
        cd /var/www
        echo '>> composer self-update'
        composer self-update
        echo '>> sudo service apache2 restart'
        sudo service apache2 restart
    SHELL
end
