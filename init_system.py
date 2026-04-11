import os

def initialize_sovereign():
    # Build Industrial Directory Tree
    folders = [
        'assets/docs', 
        'assets/media', 
        'assets/products',
        'core',
        '.github/workflows'
    ]
    
    for folder in folders:
        if not os.path.exists(folder):
            os.makedirs(folder)
            print(f"[SUCCESS] Created Folder: {folder}")

    # Check for .env file
    if not os.path.exists('.env'):
        with open('.env', 'w') as f:
            f.write("SYSTEM_INITIALIZED=TRUE\n")
        print("[NOTICE] Created empty .env - Update your banking details.")

    print("\n[COMPLETE] Sovereign System Structure is now Pixel-Perfect.")

if __name__ == "__main__":
    initialize_sovereign()
  
