import { z } from "zod";

export const registrationSchema = z.object({
    nickname: z
        .string().nonempty("Brugernavn skal være mindst 1 bogstaver")
        .max(15, "Brugernavn skal være mindst 1-15 bogstaver")
        .regex(/^[a-zA-Z0-9_]+$/, "Brugernavn kan kun indeholde bogstaver, tal og underscores"),

    name: z.string().nonempty("Fornavn skal være mindst 1 bogstaver"),

    afterName: z.string().nonempty("Efternavn skal være mindst 1 bogstaver"),

    email: z.string().min(5, "Email skal være mindst 5 tegn").email("Ugyldig email"),

    password: z
        .string().min(8, "Password skal være mindst 8 tegn")
        .regex(/[A-Z]/, "Password skal indeholde mindst et stort bogstav")
        .regex(/[0-9]/, "Password skal indeholde mindst et tal")
        .regex(/[!@#$%^&*.?]/, "Password skal indeholde mindst et specialtegn"),

    repeatPassword: z.string(),

    date: z.string().refine((val) => {
        const date = new Date(val);
        if (isNaN(date)) return false;
        const today = new Date();
        let age = today.getFullYear() - date.getFullYear();
        const monthDiff = today.getMonth() - date.getMonth();
        const dayDiff = today.getDate() - date.getDate();
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) age--;
        return age >= 18;
    }, {
        message: "Du skal være mindst 18 år gammel"
    }),

    number: z.string().regex(/^\+?\d{8,15}$/, "Telefonnummer skal være mindst 8 cifre"),
})
.refine((data) => data.password === data.repeatPassword, {
    message: "Passwords matcher ikke",
    path: ["repeatPassword"],
});
