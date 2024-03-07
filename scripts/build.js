const esbuild = require('esbuild');
const fs = require('fs');
const zeaburO = '.zeabur/output/functions/index.func';
if (fs.existsSync('.zeabur/output')) {
    console.info('Removing old .zeabur/output')
    fs.rmSync('.zeabur/output', {recursive: true})
}

function getModuleEntries() {
    function getModuleEntriesRecursive(dir) {
        let entries = []
        fs.readdirSync(dir).forEach(file => {
            const path = `${dir}/${file}`
            if (fs.statSync(path).isDirectory()) {
                if(file === 'node_modules') return
                entries = entries.concat(getModuleEntriesRecursive(path))
            } else if (file.endsWith('.js')) {
                entries.push(path)
            }
        })
        return entries
    }
    return getModuleEntriesRecursive('.')
}

try {
    esbuild.build({
        entryPoints: getModuleEntries(),
        bundle: false,
        minify: false,
        outdir: '.zeabur/output/functions/index.func',
        platform: 'node',
        target: 'node20',
        plugins: [{
            name: 'make-all-packages-external',
            setup(build) {
                let filter = /^[^.\/]|^\.[^.\/]|^\.\.[^\/]/ // Must not start with "/" or "./" or "../"
                build.onResolve({filter}, args => ({path: args.path, external: true}))
            },
        }],
    }).then(res => {
        if (res.errors.length > 0) {
            console.error(res.errors)
            process.exit(1)
        }
        console.info('Successfully built app.js into .zeabur/output/functions/index.func')
        fs.copyFileSync('.zeabur/output/functions/index.func/vanilla.js', '.zeabur/output/functions/index.func/index.js');
        fs.rmSync('.zeabur/output/functions/index.func/vanilla.js')
    })
} catch (error) {
    console.error(error)
}

fs.cpSync('package.json', '.zeabur/output/functions/index.func/package.json')

