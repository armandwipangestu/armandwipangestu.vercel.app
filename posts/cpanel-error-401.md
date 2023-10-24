---
title: "cPanel - Cara memperbaiki error 401 pada WHM cPanel"
tag: "SysAdmin"
date: "June 27 2023"
excerpt: "Pada artikel ini kita akan melakukan konfigurasi server untuk mengatasi error 401 ketika mengakses WHM cPanel"
cover_image: "/images/posts/default.png"
author_name: "Arman Dwi Pangestu"
author_title: "Web Developer"
author_image: "/images/posts/author/arman.png"
---

## Host Access Control

Seperti yang anda pernah lihat dari `Host Access Control` pada web pages WHM, anda membutuhkan untuk memasukan `TCP Wrapper service name` atau `ALL`, sebuah IP Address atau `ALL` dan
apapun yang anda inginkan untuk akses `ALLOW` atau `DENY`. File ini disimpan pada `/etc/hosts.allow`.

Tapi masalah nya adalah kita tidak mengetahui nama service yang akan dimasukan. Saya sudah memasukan `ALL` dan berjalan,
namun itu akan menberikan akses untuk semua service (yang dimana saya tidak mau itu).

| Alias      | Service Name                    |
| ---------- | ------------------------------- |
| snmp       | SNMP Service                    |
| sshd       | SSH Service                     |
| pop3       | Pop3 Service Daemon             |
| domain     | DNS Services                    |
| auth       | Ident Service                   |
| cpaneld    | cPanel Service Daemon           |
| postgresql | PostgreSQL Service              |
| smtp       | SMTP Service Daemon             |
| whostmgrd  | Web Host Manager Service Daemon |
| cpdavd     | WebDav/WebDisk Service Daemon   |
| telnet     | Telnet Service                  |
| ftp        | FTP Server                      |
| mysql      | MySQL Server                    |
| imap       | Imap Service Daemon             |
| webmaild   | WebMail Service Daemon          |

> **ERROR MESSAGE**:
>
> ```
> Use of uninitialized value $document in index at /usr/local/cpanel/Cpanel/Server/Response.pm line 279.
> Use of uninitialized value $document in index at /usr/local/cpanel/Cpanel/Server/Response.pm line 279.
> Use of uninitialized value $document in index at /usr/local/cpanel/Cpanel/Server/Response.pm line 279.
> Use of uninitialized value $document in index at /usr/local/cpanel/Cpanel/Server/Response.pm line 279.
> Use of uninitialized value $document in index at /usr/local/cpanel/Cpanel/Server/Response.pm line 279.
> Use of uninitialized value $document in index at /usr/local/cpanel/Cpanel/Server/Response.pm line 279.
> Use of uninitialized value in index at /usr/local/cpanel/Cpanel/Server/Response.pm line 135.
> Use of uninitialized value in index at /usr/local/cpanel/Cpanel/Server/Response.pm line 135.
> Dropping connection from <ip_address_request> because of tcp_wrappers at cpsrvd.pl line 4084.
> Dropping connection from <ip_address_request> because of tcp_wrappers at cpsrvd.pl line 4084.
> ```

Untuk mengatasi hal tersebut, kalian bisa menambahkan konfigurasi berikut di file `/etc/hosts.allow`

```
#
# hosts.allow   This file contains access rules which are used to
#               allow or deny connections to network services that
#               either use the tcp_wrappers library or that have been
#               started through a tcp_wrappers-enabled xinetd.
#
#               See 'man 5 hosts_options' and 'man 5 hosts_access'
#               for information on rule syntax.
#               See 'man tcpd' for information on tcp_wrappers
#

# anda bisa menambahkan ip address dengan spesifik host
#whostmgrd : <ip_address_request> :  allow

# anda juga bisa menggunakan satu network dengan menggunakan subnet mask nya
#whostmgrd : <ip_address_request>/<CIDR> : allow

# atau anda juga bisa menggunakan konfigurasi seperti berikut
# konfigurasi dibawah ini artinya:
# "Semua list ip yang ada di list bisa masuk ke whostmgrd dan selain dari list ip ini tidak bisa"
whostmgrd : ALL EXCEPT 192.168.10. , 172.16.32. , 10.0.0. : DENY
```
