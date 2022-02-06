<p align="center">
  <img src="https://user-images.githubusercontent.com/52314985/147781283-5f0e4c58-4edc-4349-b885-10a94a08c141.png" alt="" />
</p>

# iStudent

С этим приложением мы улучшаем жизнь студентов, позволив им контроллировать свое время на задачи по дисциплинам, выставление приоритетов и многое другое!

# Установка и настройка окружения

1. Установка Chocolatey, менеджер пакетов для Windows

Это необходимо для быстрой установки необходимых программ.

1.1 Запустите PowerShell с помощью администратора и выпонлите следующие команды

```
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

2. Установка Java Development Kit с помощью Chocolatey (если есть NodeJS)

```
choco install -y nodejs-lts openjdk11
```
3. Установите Android Studio с официального сайта: https://developer.android.com/studio/index.html

4. Настройте пользовательские переменные пути:

Open the Windows Control Panel.

Click on User Accounts, then click User Accounts again

Click on Change my environment variables

Click on New... to create a new ANDROID_HOME user variable that points to the path to your Android SDK:

![image](https://user-images.githubusercontent.com/52314985/152680515-e6992c30-dc60-4d2f-a4fb-453c0e20cca6.png)

4. Add platform-tools to Path

Open the Windows Control Panel.

Click on User Accounts, then click User Accounts again

Click on Change my environment variables

Select the Path variable.

Click Edit.

Click New and add the path to platform-tools to the list.

https://reactnative.dev/docs/environment-setup
