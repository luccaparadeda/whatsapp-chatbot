import whats from "whatsapp-web.js";
import qrcode from "qrcode-terminal";

const client = new whats.Client({
	authStrategy: new whats.LocalAuth({ clientId: "batata" }),
	puppeteer: {
		headless: true,
		// executablePath: "/usr/bin/chromium-browser",
		args: ["--no-sandbox", "--disable-gpu"],
	},
	webVersionCache: {
		type: "remote",
		remotePath:
			"https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
	},
	// webVersionCache: {
	//   type: 'remote',
	//   remotePath: `https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/${wwebVersion}.html`,
	// },
	// webVersionCache: {
	//   type: 'remote',
	//   remotePath:
	//     'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
	// },
});
client.on("ready", () => {
	console.log("Client is ready!");
});

client.on("qr", (qr) => {
	qrcode.generate(qr, { small: true });
});

client.on("message_create", (message) => {
	if (message.body === "!ping") {
		// reply back "pong" directly to the message
		message.reply("pong");
	}
});

client.initialize();
