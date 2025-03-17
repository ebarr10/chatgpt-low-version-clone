# personal-assistant-development

# Setting Up Your Development Environment (Windows)

## Prerequisites

- **Windows 10 or 11**
- **PowerShell (Run as Administrator)**
- **Python (Latest Version)** [Download Here](https://www.python.org/downloads/)
- **Git (Optional but Recommended)** [Download Here](https://git-scm.com/downloads)

## 1. Install Python and Pip

Ensure you have Python installed. Check by running:

```powershell
python --version
```

If not installed, download and install it from [python.org](https://www.python.org/downloads/). During installation, select **"Add Python to PATH"**.

## 2. Set Up a Virtual Environment

```powershell
python -m venv myenv
```

Activate the virtual environment:

```powershell
myenv\Scripts\activate
```

## 3. Install Required Dependencies

Run:

```powershell
pip install -r requirements.txt
```

## 4. Install PostgreSQL and Set Up PATH (If Using a Database)

1. Open PowerShell as Administrator and Download PostgreSQL

```powershell
Invoke-WebRequest -Uri "https://get.enterprisedb.com/postgresql/postgresql-16.1-1-windows-x64.exe" -OutFile "postgres_installer.exe"
```

2. Run the installer

```powershell
Start-Process -FilePath "postgres_installer.exe" -Wait
```

3. Download and install PostgreSQL from [here](https://www.postgresql.org/download/windows/).
4. Add it to PATH:

```powershell
[System.Environment]::SetEnvironmentVariable("Path", $env:Path + ";C:\Program Files\PostgreSQL\16\bin", [System.EnvironmentVariableTarget]::Machine)
```

5. Restart PowerShell and check:

```powershell
psql --version
```

6. Running PostgreSQL

```powershell
psql -U postgres
```

## 5. Run the Application

If using **FastAPI**, start the server:

```powershell
uvicorn main:app --reload
```

## Troubleshooting

- **"Command Not Found" Errors** → Restart PowerShell and ensure the PATH variable is correctly set.
- **Installation Issues** → Run PowerShell as Administrator and try `pip install` again.
- **PostgreSQL Not Found** → Manually add the bin directory to the PATH under System Environment Variables.

---

Now you're ready to develop and run your AI assistant! 🚀
