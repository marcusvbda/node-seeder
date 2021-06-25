const fs = require("fs")
const rootDir = require('path').resolve('./')
const seederConfig = require(`${rootDir}/node-seeder.config`)

let dirCont = fs.readdirSync(seederConfig.path ?? "./")
let seeders = dirCont.filter((file) => {
	return (file.match(/.*\.(seeder).js/ig))
}).map(file => require(`./${file}`))

const method = (process.argv.slice(2)[0] ?? "--seed").replace("--", "").trim()

const seeder = async () => {
	for (let i = 0;i < seeders.length;i++) {
		await seeders[i][method]()
	}
}

seeder().then(() => {
	process.exit()
})
