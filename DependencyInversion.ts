/**
 * Class Mailer
 *
 * The Mailer class encapsulates the functionality to send email messages.
 */
class Mailer {
	/**
	 * Sends an email message to the specified recipient.
	 *
	 * @param {string} message - The content of the email message.
	 * @param {string} to - The recipient's email address.
	 * @returns {void}
	 */
	public sendEmail(message: string, to: string): void {
		console.log({
			to: to,
			message: message,
		});
	}
}

/*
in this example the notificationSender class is meant to be general and not
dependant on the type of the service I'd send notification by but here it
relying only on the Mailer class which can be removed in the future or
replaced with another method of sending messages.
this violates the Dependency Inversion principle (DIP)
*/

/**
 * Class NotificationSender
 *
 * The NotificationSender class is responsible for sending notifications.
 * It currently depends directly on the Mailer class to send email notifications.
 * This violates the Dependency Inversion Principle (DIP) as it tightly couples
 * to a specific implementation rather than an abstraction.
 */
class NotificationSender {
	/**
	 * @var {Mailer} MailSender - An instance of the Mailer class.
	 */
	private MailSender: Mailer;

	/**
	 * Constructs a NotificationSender object with a dependency on the Mailer class.
	 */
	constructor() {
		this.MailSender = new Mailer();
	}

	/**
	 * Sends a notification using the Mailer class.
	 *
	 * @param {string} message - The content of the notification.
	 * @param {string} to - The recipient's information.
	 * @returns {void}
	 */
	public sendNotification(message: string, to: string): void {
		this.MailSender.sendEmail(message, to);
	}
}
const mailer: Mailer = new Mailer();
const notificationSender: NotificationSender = new NotificationSender();
notificationSender.sendNotification("hello world", "Othman");

/*
After Applying the DIP, the NotificationService isn't reliant on the Mailer
class, it now supports any service that provides sending messages functionality
which make it more flexible
*/

/**
 * Interface MessageSender
 *
 * The MessageSender interface declares the contract for classes that can send messages.
 */
interface MessageSender {
	/**
	 * Sends a message to the specified recipient.
	 *
	 * @param {string} message - The content of the message.
	 * @param {string} to - The recipient's information.
	 * @returns {void}
	 */
	SendMessage(message: string, to: string): void;
}

/**
 * Class Email
 *
 * The Email class implements the MessageSender interface to send email messages.
 */
class Email implements MessageSender {
	/**
	 * Sends an email message to the specified recipient.
	 *
	 * @param {string} message - The content of the email message.
	 * @param {string} to - The recipient's email address.
	 * @returns {void}
	 */
	public SendMessage(message: string, to: string): void {
		console.log({
			to: to,
			message: message,
		});
	}
}

/**
 * Class SMS
 *
 * The SMS class implements the MessageSender interface to send SMS messages.
 */
class SMS implements MessageSender {
	/**
	 * Sends an SMS message to the specified recipient.
	 *
	 * @param {string} message - The content of the SMS message.
	 * @param {string} to - The recipient's phone number.
	 * @returns {void}
	 */
	public SendMessage(message: string, to: string): void {
		console.log({
			to: to,
			message: message,
		});
	}
}

/**
 * Class NotificationService
 *
 * The NotificationService class is responsible for sending notifications.
 * It now depends on the MessageSender interface, adhering to the Dependency Inversion Principle (DIP).
 */
class NotificationService {
	/**
	 * @var {MessageSender} provider - An instance of a class that implements the MessageSender interface.
	 */
	private provider: MessageSender;

	/**
	 * Constructs a NotificationService object with a dependency on a MessageSender provider.
	 *
	 * @param {MessageSender} provider - An instance of a class that implements the MessageSender interface.
	 */
	constructor(provider: MessageSender) {
		this.provider = provider;
	}

	/**
	 * Sends a notification using the configured MessageSender provider.
	 *
	 * @param {string} message - The content of the notification.
	 * @param {string} to - The recipient's information.
	 * @returns {void}
	 */
	public SendNotification(message: string, to: string): void {
		this.provider.SendMessage(message, to);
	}
}

const email: MessageSender = new Email();
const sms: MessageSender = new SMS();

const notifyByEmail: NotificationService = new NotificationService(email);
const notifyBySms: NotificationService = new NotificationService(sms);
notifyByEmail.SendNotification("notification via Email", "Othman");
notifyBySms.SendNotification("notification via SMS", "Othman");
