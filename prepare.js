const { exec } = require('child_process');
const os = require('os');

function runCommand(command) {
  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error: ${err.message}`);
      return;
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return;
    }
    console.log(`Stdout: ${stdout}`);
  });
}

if (os.platform() === 'win32') {
  // Windows commands
  runCommand('rmdir /s /q .\\ui && swc --config-file .swcrc-build -d ui src');
} else if (os.platform() === 'darwin') {
  // macOS commands
  runCommand('rm -rf ./ui && swc --config-file .swcrc-build -d ui src');
} else {
  console.error('Unsupported platform');
}
