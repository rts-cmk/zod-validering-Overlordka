import "./RegistrationForm.sass"
import { registrationSchema } from "../validation/valiation"
import { useState } from "react";

export default function RegistrationForm() {

    const [nickname, setNickname] = useState("");
    const [name, setName] = useState("");
    const [afterName, setAfterName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [date, setDate] = useState("");
    const [tel, setTel] = useState("");

    const validateField = async (field, value) => {
        try {
            const fieldSchema = registrationSchema.shape?.[field];
            if (fieldSchema) {
                const res = await fieldSchema.safeParseAsync(value);
                const err = res.success ? "" : (res.error.issues[0]?.message || "");
                switch (field) {
                    case "nickname": setNickname(err); break;
                    case "name": setName(err); break;
                    case "afterName": setAfterName(err); break;
                    case "email": setEmail(err); break;
                    case "password": setPassword(err); break;
                    case "repeatPassword": setRepeatPassword(err); break;
                    case "date": setDate(err); break;
                    case "number": setTel(err); break;
                    default: break;
                }
            }
            if (field === "password" || field === "repeatPassword") {
                const pw = document.getElementById("password")?.value || "";
                const rp = document.getElementById("repeatPassword")?.value || "";
                if (pw && rp && pw !== rp) setRepeatPassword("Passwords matcher ikke");
                else setRepeatPassword(""); 
            }
        } catch (e) {
            console.error("validateField error", e);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        const result = registrationSchema.safeParse(data)


        if (!result.success) {

            setNickname(result.error.format().nickname?._errors[0] || "");
            setName(result.error.format().name?._errors[0] || "");
            setAfterName(result.error.format().afterName?._errors[0] || "");
            setEmail(result.error.format().email?._errors[0] || "");
            setPassword(result.error.format().password?._errors[0] || "");
            setRepeatPassword(result.error.format().repeatPassword?._errors[0] || "");
            setDate(result.error.format().date?._errors[0] || "");
            setTel(result.error.format().number?._errors[0] || "");

            console.log("validation", data);

            console.log(result.error.format())
            return;
        }
        console.log("Form submitted successfully", result.data);
        alert("Form submitted successfully");

        setNickname("");
        setName("");
        setAfterName("");
        setEmail("");
        setPassword("");
        setRepeatPassword("");
        setDate("");
        setTel("");

    }



    return (
        <form onSubmit={handleSubmit} className="reg-form">
            <fieldset className="reg-form__fieldset">
                <legend className="reg-form__legend">
                    Registration Form
                </legend>
                    <label htmlFor="nickname">Brugernavn</label>
                    <input id="nickname" name="nickname" type="text" onChange={(e) => validateField("nickname", e.target.value)} />
                    {nickname !== "" && (<span className="error">{nickname}</span>)}
                    <label htmlFor="name">Fornavn</label>
                    <input id="name" name="name" type="text" onChange={(e) => validateField("name", e.target.value)} />
                    {name !== "" && (<span className="error">{name}</span>)}
                    <label htmlFor="afterName">Efternavn</label>
                    <input id="afterName" name="afterName" type="text" onChange={(e) => validateField("afterName", e.target.value)} />
                    {afterName !== "" && (<span className="error">{afterName}</span>)}
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" onChange={(e) => validateField("email", e.target.value)} />
                    {email !== "" && (<span className="error">{email}</span>)}
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" onChange={(e) => validateField("password", e.target.value)} />
                    {password !== "" && (<span className="error">{password}</span>)}
                    <label htmlFor="repeatPassword">Gentag password</label>
                    <input id="repeatPassword" name="repeatPassword" type="password" onChange={(e) => validateField("repeatPassword", e.target.value)} />
                    {repeatPassword !== "" && (<span className="error">{repeatPassword}</span>)}
                    <label htmlFor="date">Fødselsdato</label>
                    <input id="date" name="date" type="date" onChange={(e) => validateField("date", e.target.value)} />
                    {date !== "" && (<span className="error">{date}</span>)}
                    <label htmlFor="number">Telefonnummer</label>
                    <input id="number" name="number" type="number" onChange={(e) => validateField("number", e.target.value)} />
                    {tel !== "" && (<span className="error">{tel}</span>)}
                    <button type="submit">Opret konto</button>
            </fieldset>
        </form>
    )

}