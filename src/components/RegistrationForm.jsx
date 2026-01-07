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

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        const result = registrationSchema.safeParse(data)

        console.log("validation", result.data)

        if (!result.success) {

            setNickname(result.error.format().nickname?._errors[0] || "");
            setName(result.error.format().name?._errors[0] || "");
            setAfterName(result.error.format().afterName?._errors[0] || "");
            setEmail(result.error.format().email?._errors[0] || "");
            setPassword(result.error.format().password?._errors[0] || "");
            setRepeatPassword(result.error.format().repeatPassword?._errors[0] || "");
            setDate(result.error.format().date?._errors[0] || "");
            setTel(result.error.format().number?._errors[0] || "");

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
                    <input id="nickname" name="nickname" type="text" />
                    {nickname !== "" && (<span className="error">{nickname}</span>)}
                    <label htmlFor="name">Fornavn</label>
                    <input id="name" name="name" type="text" />
                    {name !== "" && (<span className="error">{name}</span>)}
                    <label htmlFor="afterName">Efternavn</label>
                    <input id="afterName" name="afterName" type="text" />
                    {afterName !== "" && (<span className="error">{afterName}</span>)}
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" />
                    {email !== "" && (<span className="error">{email}</span>)}
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" />
                    {password !== "" && (<span className="error">{password}</span>)}
                    <label htmlFor="repeatPassword">Gentag password</label>
                    <input id="repeatPassword" name="repeatPassword" type="password" />
                    {repeatPassword !== "" && (<span className="error">{repeatPassword}</span>)}
                    <label htmlFor="date">Fødselsdato</label>
                    <input id="date" name="date" type="date" />
                    {date !== "" && (<span className="error">{date}</span>)}
                    <label htmlFor="number">Telefonnummer</label>
                    <input id="number" name="number" type="number" />
                    {tel !== "" && (<span className="error">{tel}</span>)}
                    <button type="submit">Opret konto</button>
            </fieldset>
        </form>
    )

}