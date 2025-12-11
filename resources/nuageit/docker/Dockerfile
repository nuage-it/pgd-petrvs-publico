# syntax=docker/dockerfile:1
FROM php:8.2-apache

# Instalar recursos adicionais
RUN apt-get update && apt-get install -y \
    sed \
    vim \
    git \
    zlib1g-dev \
    libzip-dev \
    unzip \
    curl \
    libcurl4-openssl-dev \
    openssl \
    libssl-dev \
    libxml2-dev \
    sudo \
    libpng-dev \
    libjpeg-dev \
    cron \
    supervisor \
    default-mysql-client \
    && pecl install redis \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Extensões PHP
RUN docker-php-ext-install zip pdo_mysql mysqli soap curl gd calendar pcntl \
    && docker-php-ext-enable pdo_mysql redis

# Workaround para openssl
RUN docker-php-ext-install openssl || true \
    && cp /usr/src/php/ext/openssl/config0.m4 /usr/src/php/ext/openssl/config.m4 \
    && docker-php-ext-install openssl

# Diretório de trabalho
WORKDIR /var/www

# Copiar arquivos de configuração (caminhos relativos à RAIZ do repo)
COPY resources/nuageit/docker/apache2.conf /etc/apache2/apache2.conf
COPY resources/nuageit/docker/000-default.conf /etc/apache2/sites-available/000-default.conf
COPY resources/nuageit/docker/cacert.pem /usr/local/etc/php/cacert.pem
COPY resources/nuageit/docker/php.ini /usr/local/etc/php/php.ini
COPY resources/nuageit/docker/horizon.conf /etc/supervisor/conf.d/horizon.conf
COPY resources/nuageit/docker/setup_production.sh /root/setup_production.sh
COPY resources/nuageit/docker/entrypoint.sh /var/www/entrypoint.sh

# Instalar Composer
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
    && php composer-setup.php --install-dir=/usr/local/bin --filename=composer \
    && rm composer-setup.php

# Habilitar módulos Apache
RUN a2enmod rewrite headers

# Configurações de produção
RUN chmod a+x /root/setup_production.sh && /root/setup_production.sh

# ============================================
# COPIAR CÓDIGO DA APLICAÇÃO
# ============================================
COPY back-end/ /var/www/

# Permissões
RUN chmod -R 1777 /tmp \
    && chmod -R 755 /var/www \
    && chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache /var/www/public

# Instalar dependências PHP
RUN composer install --optimize-autoloader --no-dev

# ============================================
# CONFIGURAR CRON (Laravel Scheduler)
# ============================================
RUN echo "* * * * * cd /var/www/ && /usr/local/bin/php artisan schedule:run >> /var/www/storage/logs/schedule.log 2>&1" | crontab -

# Criar diretórios de log
RUN mkdir -p /var/www/storage/logs \
    && touch /var/www/storage/logs/schedule.log \
    && touch /var/www/storage/logs/horizon.log \
    && chown -R www-data:www-data /var/www/storage/logs

# Expor porta
EXPOSE 8000

# Entrypoint + Apache
CMD ["sh", "-c", "service cron start && chmod +x /var/www/entrypoint.sh && /var/www/entrypoint.sh && /usr/local/bin/apache2-foreground"]
