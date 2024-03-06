To make your PowerShell scripts available anywhere on your machine, you can follow these steps:

1. **Create a Scripts Directory:**

    - Choose a location for your scripts. For example, you can create a directory named "Scripts" in your user profile folder.

        ```powershell
        New-Item -ItemType Directory -Path $HOME\Scripts -Force
        ```

2. **Update PowerShell Profile:**

    - Open your PowerShell profile script. If it doesn't exist, PowerShell profiles are stored in files named `$PROFILE.CurrentUserCurrentHost` and `$PROFILE.AllUsersCurrentHost`. You can check if they exist using:

        ```powershell
        Test-Path $PROFILE.CurrentUserCurrentHost
        ```

        If it returns `False`, create a new profile:

        ```powershell
        New-Item -ItemType File -Path $PROFILE.CurrentUserCurrentHost -Force
        ```

    - Open the profile script in a text editor:

        ```powershell
        notepad $PROFILE.CurrentUserCurrentHost
        ```

    - Add the following line to the profile script to include your script directory in the `$env:PATH` variable:

        ```powershell
        $env:PATH += ";$HOME\Scripts"
        ```

    Save and close the profile script.

3. **Reload the Profile:**

    - To apply the changes, reload your PowerShell profile:

        ```powershell
        . $PROFILE
        ```

4. **Place Scripts in the Directory:**
    - Place your PowerShell scripts in the "Scripts" directory you created.

Now, you should be able to run your scripts from any location in PowerShell. Make sure that your scripts have the appropriate execution policy set to allow them to run. You can set the execution policy using:

```powershell
Set-ExecutionPolicy RemoteSigned
```

Choose an execution policy that suits your security requirements. Note that changing the execution policy requires administrative privileges.

With these steps, your PowerShell scripts placed in the specified directory will
be available globally on your machine, and you can execute them from any
PowerShell session.
