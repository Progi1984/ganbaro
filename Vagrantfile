# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
    config.vm.box = "scotch/box"
    config.vm.network "private_network", ip: "192.168.33.11"
    config.vm.hostname = "scotchbox"
    config.vm.synced_folder ".", "/var/www", :mount_options => ["dmode=777", "fmode=777"]

    # Optional NFS. Make sure to remove other synced_folder line too
    #config.vm.synced_folder ".", "/var/www", :nfs => { :mount_options => ["dmode=777","fmode=666"] }

    config.vm.provider "virtualbox" do |v|
      v.memory = 4096
      v.cpus = 2
    end

    config.ssh.username = "vagrant"
    config.ssh.password = "vagrant"

    config.vm.provision "shell", inline: <<-SHELL
        ## Yarn
        echo '>> curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -'
        curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
        ## PHP 7.2
        echo '>> sudo add-apt-repository -y ppa:ondrej/php'
        sudo add-apt-repository -y ppa:ondrej/php
        ## Repository update
        echo '>> sudo apt-get update'
        sudo apt-get update
        echo '>> sudo apt-get -y install php7.2 libapache2-mod-php7.2 libphp7.2-embed libssl-dev openssl php7.2-cgi php7.2-cli php7.2-common php7.2-dev php7.2-fpm php7.2-phpdbg php7.2-xml php7.2-mbstring php7.2-curl php7.2-mysql php7.2-gd php7.2-imagick php7.2-sqlite php7.2-intl'
        sudo apt-get -y install php7.2 libapache2-mod-php7.2 libphp7.2-embed libssl-dev openssl php7.2-cgi php7.2-cli php7.2-common php7.2-dev php7.2-fpm php7.2-phpdbg php7.2-xml php7.2-mbstring php7.2-curl php7.2-mysql php7.2-gd php7.2-imagick php7.2-sqlite php7.2-intl
        echo '>> sudo apt-get -y install yarn'
        sudo apt-get -y install yarn
        echo '>> sudo a2dismod php7.0'
        sudo a2dismod php7.0
        echo '>> sudo a2enmod php7.2'
        sudo a2enmod php7.2
        echo '>> Composer'
        sudo rm /usr/local/bin/composer
        php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
        sudo php composer-setup.php --install-dir=/usr/local/bin --filename=composer
        php -r "unlink('composer-setup.php');"
        echo '>> composer self-update'
        composer self-update
        echo '>> sudo service apache2 restart'
        sudo service apache2 restart
    SHELL
    config.vm.provision "shell", privileged: false, inline: <<-SHELL
        echo '>> echo $USER'
        echo $USER
        export NVM_DIR="$HOME/.nvm"
        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
        [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
        echo '>> cd /var/www'
        cd /var/www
        echo '>> composer install'
        composer install
        echo '>> nvm install --lts'
        nvm install --lts
        echo '>> nvm use --lts'
        nvm use --lts
        echo '>> yarn install'
        yarn install
        echo '>> yarn encore dev'
        yarn encore dev
    SHELL
end
