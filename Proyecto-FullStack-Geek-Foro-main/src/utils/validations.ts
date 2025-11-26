export function validateRequired(value: string): string {
	if (!value || value.trim() === "") return "Este campo es obligatorio.";
	return "";
}

export function validateLength(value: string, min: number, max?: number): string {
	if (value.length < min) return `Debe tener al menos ${min} caracteres.`;
	if (max && value.length > max) return `Debe tener máximo ${max} caracteres.`;
	return "";
}

export function validateEmail(email: string): string {
	const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!re.test(email)) return "Correo electrónico inválido.";
	return "";
}

export function validatePassword(password: string): string {
	if (password.length < 6) return "La contraseña debe tener al menos 6 caracteres.";
	return "";
}

export function validateName(name: string): string {
	if (!name || name.trim().length < 2) return "Nombre inválido.";
	return "";
}

export function validateMessage(message: string): string {
	if (!message || message.trim().length < 10) return "El mensaje debe tener al menos 10 caracteres.";
	return "";
}

export function validateTitle(title: string): string {
	if (!title || title.trim().length < 3) return "El título debe tener al menos 3 caracteres.";
	return "";
}

export function validateContent(content: string): string {
	if (!content || content.trim().length < 10) return "El contenido debe tener al menos 10 caracteres.";
	return "";
}

export function isAdminEmail(email: string): boolean {
	return email.endsWith('@geekplay.cl');
}

export interface ContactFormValues {
	name: string;
	email: string;
	message: string;
}

export function validateContactForm(values: ContactFormValues): Partial<ContactFormValues> {
	return {
		name: validateName(values.name),
		email: validateEmail(values.email),
		message: validateMessage(values.message)
	};
}

export interface LoginFormValues {
	email: string;
	password: string;
}

export function validateLoginForm(values: LoginFormValues): Partial<LoginFormValues> {
	return {
		email: validateEmail(values.email),
		password: validatePassword(values.password)
	};
}

export interface RegistrationFormValues {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export function validateRegistrationForm(values: RegistrationFormValues): Partial<RegistrationFormValues> {
	return {
		name: validateName(values.name),
		email: validateEmail(values.email),
		password: validatePassword(values.password),
		confirmPassword: values.password !== values.confirmPassword ? "Las contraseñas no coinciden." : ""
	};
}

export interface ProfileFormValues {
	nombre: string;
	correo: string;
	nuevaPassword?: string;
	confirmarPassword?: string;
}

export function validateProfileForm(values: ProfileFormValues): Partial<ProfileFormValues> {
	const errors: Partial<ProfileFormValues> = {
		nombre: validateName(values.nombre),
		correo: validateEmail(values.correo)
	};

	// Si se ingresó una nueva contraseña, validarla
	if (values.nuevaPassword) {
		errors.nuevaPassword = validatePassword(values.nuevaPassword);
		if (values.nuevaPassword !== values.confirmarPassword) {
			errors.confirmarPassword = "Las contraseñas no coinciden.";
		}
	}

	return errors;
}

export interface ForumPostValues {
	titulo: string;
	contenido: string;
}

export function validateForumPost(values: ForumPostValues): Partial<ForumPostValues> {
	return {
		titulo: validateTitle(values.titulo),
		contenido: validateContent(values.contenido)
	};
}
