# server-console-log : README 

This extension allows you to view server-side console.log() outputs directly in the browser's DevTools (Console tab), making debugging for Next.js projects (below version 15) more efficient and seamless.

# Features

1. Automatically adds the use client directive in Server Components when console.log() is used, enabling   browser-side logging.
2. Easily track logs in DevTools' Console tab without additional configuration.

# Setup & Usage

1. Open Visual Studio Code (VSC).

2. Press Cmd + Shift + P to open the command palette.

3. Search for "Console Now" and select the command.

4. Open any Server Component in your Next.js project.

5. Add a console.log() and save the file. The use client directive will appear at the top of the file automatically.

6. Save the file again, and then open the DevTools Console tab in your browser to view the console.log() output.

7. To remove the console log, delete it from the file and save again. The use client directive will automatically be removed.


# HAPPY CODING! :)
