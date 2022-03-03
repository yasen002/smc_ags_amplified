import React, { useReducer, useRef, useState, useEffect } from 'react'
import styles from "../styles/Form.module.scss"
import RadioSelect from '../Component/RadioSelect'
import Checkbox from '../Component/Checkbox'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { DataStore } from '@aws-amplify/datastore';
import { Student } from '../src/models';
const initialState = {
    units: "",
    pmc: "",
    meetingAvailability: "",
    eop_gaurdian: [],
    gpa: "",
    memberShip: "Initial Member. Your scholarship dues is $10.",
    priorMember: "",
    permanentMember: "",
}

function Form({ attributes }) {
    const session = { email: attributes.email, name: (attributes.given_name + " " + attributes.family_name) }
    var unitsChoice = choiceProvider('unitsChoice')
    var mentoringCommiteeChoice = choiceProvider('mentoringCommiteeChoice')
    var EOP_Scholars_Choice = choiceProvider("EOP_Scholars_Choice")
    var meetingTimeChoice = choiceProvider("meetingTimeChoice")
    var gpaChoice = choiceProvider("gpaChoice")
    var priorMemberChoice = choiceProvider("priorMemberChoice")
    var permanentMemberChoice = choiceProvider("permanentMemberChoice")

    const [warningText, setWarningText] = useState("")
    const [signatureWarning, setSignatureWarning] = useState("")
    const [fileUploadWarning, setFileUploadWarning] = useState("")
    const [state, dispatch] = useReducer(reducer, initialState)
    const smcIDRef = useRef(null);
    const nameRef = useRef(null);
    const countryRef = useRef(null);
    const cityRef = useRef(null);
    const zipCodeRef = useRef(null);
    const phoneRef = useRef(null)
    const majorRef = useRef(null)
    const studyGroupRef = useRef(null)
    const signatureRef = useRef(null)
    const preferredNameRef = useRef(null)
    const fileUploadConfirmCodeRef = useRef(null)
    const transcriptUploadLink = "https://forms.gle/PusZWSvqNGYtuDHc8"
    const router = useRouter()
    const checkHandler = (e) => {
        var check = e.target.checked
        var value = e.target.value
        var name = e.target.name
        if (check === true) {
            dispatch({ type: "addCheckBox", payload: { item: name, value: value } })
        } else if (check === false) {
            dispatch({ type: "removeCheckBox", payload: { item: name, value: value } })
        }
    }

    const selectHandler = (e) => {
        var value = e.target.value
        var name = e.target.name
        var oldState = state

        dispatch({ type: "updateSelect", payload: { item: name, value: value } })

        if (name === "units" || name === "gpa" || name === "priorMember" || name === "permanentMember") {
            oldState[name] = value;
            const { units, gpa, priorMember, permanentMember } = oldState;
            if (gpa !== "" && units !== "" && priorMember !== "") {
                if (units === "0") {
                    dispatch({ type: "updateSelect", payload: { item: "memberShip", value: "temporary membership. Your scholarship dues is $10." } })
                } else if (units !== "1 - 11" && units !== "0") {
                    if (priorMember === "Yes" && permanentMember === "No") {
                        dispatch({ type: "updateSelect", payload: { item: "memberShip", value: "continuing membership. Your scholarship dues is $10." } })
                    } else if (priorMember === "Yes" && permanentMember === "Yes") {
                        dispatch({ type: "updateSelect", payload: { item: "memberShip", value: "permanent membership. Your scholarship dues is $0" } })
                    } else if (priorMember === "No") {
                        dispatch({ type: "updateSelect", payload: { item: "memberShip", value: "initial membership. Your scholarship dues is $10" } })
                    }
                }
            }
            if (units === "1 - 11") {
                setWarningText("You have to compolete 12 college or university units before Spring 2022 to be considered as an AGS member! You application needs to be reviewed by our advisor.")
            } else {
                setWarningText("")
            }
            if (name === "gpa" && value === "Less than 3.0") {
                setWarningText("SMC AGS requires students to have at least 3.0 GPA to be considered as a member! You might not qualify for our membership.")
            } else {
                setWarningText("")
            }
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {

            var studentID = smcIDRef.current.value;
            var officialName = session.name;
            var country = countryRef.current.value;
            var city = cityRef.current.value;
            var zipCode = zipCodeRef.current.value;
            var phone = phoneRef.current.value;
            var email = session.email;
            var major = majorRef.current.value;
            var interest = studyGroupRef.current.value;
            var signature = signatureRef.current.value;
            var preferredName = preferredNameRef.current.value
            var fileUploadCode = fileUploadConfirmCodeRef.current.value
            var officialName = (session.name).replace(/ /g, '').toUpperCase();
            var signedName = signature.replace(/ /g, '').toUpperCase();
            if (officialName !== signedName) {
                setSignatureWarning(`Your signature must excactly match your official full name: ${session.name}`); return;
            } else {
                setSignatureWarning(``);
            }

            const formData = {
                studentID,
                officialName,
                country,
                city,
                zipCode,
                phone,
                email,
                major,
                interest,
                preferredName,
                documentUpload: fileUploadCode,
                units: state.units,
                peerMentor: state.pmc,
                meetingTime: state.meetingAvailability,
                EOP_Scholar: JSON.stringify(state.eop_gaurdian),
                gpa: state.gpa,
                membership: state.memberShip,
                payment: "not received"
            };

            await DataStore.save(
                new Student(formData)
            );
            router.replace("/ags/signup/success")
        } catch (error) {
            console.log(error, error.errorType)
        }

    }
    return (
        <div className={styles.container}>
            <h1>2022 Spring AGS Application</h1>
            <form onSubmit={submitHandler}>
                <div className={styles.textField}>
                    <label htmlFor="fname">Your official name</label><br />
                    <input ref={nameRef} type='text' id='fname' name='fname' value={session.name} disabled></input><br />
                </div>
                <div className={styles.textField}>
                    <label htmlFor="fname">Your preferred name</label><br />
                    <input ref={preferredNameRef} type='text' id='fname' name='fname' ></input><br />
                </div>

                <div className={styles.textField}>
                    <label htmlFor="smcID">SMC Student ID number. *</label><br />
                    <input ref={smcIDRef} type='number' id='smcID' name='smcID' required></input><br />
                </div>
                <div className={styles.address}>
                    <p>For the AGS members record, your current Address (input "International" if you are currently living outside of the U.S.) *</p>
                    <div className={styles.addressFields}>
                        <div className={styles.textField}>
                            <label htmlFor="country">Country *</label><br />
                            <input ref={countryRef} type='text' id='country' name='country' required></input><br />
                        </div>
                        <div className={styles.textField}>
                            <label htmlFor="city">City *</label><br />
                            <input ref={cityRef} type='text' id='city' name='city' required></input><br />
                        </div>
                        <div className={styles.textField}>
                            <label htmlFor="zipCode">Zipcode *</label><br />
                            <input ref={zipCodeRef} type='text' id='zipCode' name='zipCode' required></input><br />
                        </div>
                    </div>
                </div>

                <div className={styles.textField}>
                    <label htmlFor="phone">Phone number *</label><br />
                    <input ref={phoneRef} type='number' id='phone' name='phone' required></input><br />
                </div>
                <div className={styles.textField}>
                    <label htmlFor="major">Your academic major. *</label><br />
                    <input ref={majorRef} type='text' id='major' name='major' required></input><br />
                </div>

                <div className={styles.textField}>
                    <label htmlFor="virtualStudyGroup">List any course(s) where you have an interest in joining virtual study group(s) or tutoring sessions?</label><br />
                    <input ref={studyGroupRef} type='text' id='virtualStudyGroup' name='virtualStudyGroup'></input><br />
                </div>

                <RadioSelect selectHandler={selectHandler} data={mentoringCommiteeChoice} />
                <RadioSelect selectHandler={selectHandler} data={meetingTimeChoice} />


                <Checkbox checkHandler={checkHandler} data={EOP_Scholars_Choice} />
                <RadioSelect selectHandler={selectHandler} data={unitsChoice} />
                <RadioSelect selectHandler={selectHandler} data={gpaChoice} />
                <RadioSelect selectHandler={selectHandler} data={priorMemberChoice} />
                {state.priorMember === "Yes" ? <RadioSelect selectHandler={selectHandler} data={permanentMemberChoice} /> : <> </>}

                <br />
                <p>According to the information you provided above, you might qualify for AGS {state.memberShip}.</p>
                <Link href='/membershiptypes'><p style={{ textDecoration: 'underLine' }}>AGS membership types</p ></Link>
                <p style={{ color: 'red' }}>{warningText}</p>

                <div className={styles.textField}>

                    <label htmlFor="virtualStudyGroup">An SMC club advisor will review your unofficial Transcript and AS student fees to verify your membership eligibility. Please upload proof of your GPA and AS student payment by<a href={transcriptUploadLink} style={{ textDecoration: 'underLine', color: 'blue' }}> submitting this Google form</a> to get your file uplaod confirmation code. <strong>Only SMC Advisors are allowed to acceess these files that you upload.</strong><br />Your file uplaod confirmation code.</label><br />
                    <input ref={fileUploadConfirmCodeRef} type='text' id='virtualStudyGroup' name='virtualStudyGroup'></input><br />
                    <p style={{ color: 'red' }}>{fileUploadWarning}</p>
                </div>

                <br />
                <div className={`${styles.box} ${styles.agreements}`} >
                    <h3>Agreement</h3>
                    <p>I have read <a target="_blank" rel="noreferrer" style={{ color: 'blue', textDecoration: 'underline' }} href="https://docs.google.com/document/d/1_3jQAZ2ijFXS6oyOEwVnO43ueZHWPrH2/edit#heading=h.gjdgxs">the AGS club constitution</a> and am aware of all items in the constitution that apply.</p>
                    <p>I have read the <a target="_blank" rel="noreferrer" style={{ color: 'blue', textDecoration: 'underline' }} href="https://docs.google.com/forms/d/e/1FAIpQLSeOI-yKidAd62S_nj125dVAwZpQSeQEAAEPeeU5M7URtkT5lA/formResponse">VIVO Orientation Packet</a></p>
                    <p>My $10 scholarship dues is non-refundable. I understand that dues are paid at www.paypal.com at agssmc2020@gmail.com, within four weeks of submission of this application. In the Memo Line: Write your last name, first name, AGS Dues Spring 2022. You can choose to "Pay a business" and AGS will pay the transaction fee.</p>
                    <p>I will abide by the <a target="_blank" rel="noreferrer" style={{ color: 'blue', textDecoration: 'underline' }} href='https://www.smc.edu/administration/governance/documents/administrative-regulations/AR_4410_StudentConductRules.pdf'>SMC Code of Conduct</a> , and if I violate the Code of Conduct I may be suspended or expelled from the club and/or reported to the Campus Disciplinarian.</p>
                    <p>I am subject to removal of the club for any misconduct, including falsely reporting the completion of hours, socials, or attendance at meetings.</p>
                    <p>I will not receive three negative ones (explained at the general meetings).</p>
                    <div>
                        <p>I will complete these following requirements in order to receive an AGS transcript notation. *</p>
                        <ul>
                            <li>Complete Virtual Independent Volunteer Opportunities (VIVOs) hours or join a committee and complete all committee requirements</li>
                            <li>Attend 5 General Meetings</li>
                            <li>Attend two AGS Sponsored Socials or attend two SMC Sponsored Workshops</li>
                            <li>Satisfy the Initial, Continuing, Temporary, or Permanent Membership requirements.</li>
                        </ul>
                    </div>
                    <label htmlFor='signature'>By typing my name <strong>{session.name} </strong> below, I agree and aware of all the Agreement and the requirements abow. I am confirming that I will comply with the AGS club by-laws, SMC Code of Conduct, and agree to all the requirements of being an AGS member and to earn an AGS transcript notation.</label><br />
                    <input ref={signatureRef} className={styles.signature} id='signature' required></input>
                    <p style={{ color: 'red' }}>{signatureWarning}</p>
                    <button type='submit' className={styles.submitButton}>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Form


function choiceProvider(type) {
    if (type === "unitsChoice") {
        return { name: "units", title: "How many units have you completed at SMC? *", values: ["0", "1 - 11", "12 - 24", "25 - 36", "37 - 48", "49+"] }
    } else if (type === 'mentoringCommiteeChoice') {
        return { name: "pmc", title: "We may form a Peer Mentoring Committee. Please choose one of the following, if applicable.", values: ["I have completed more than 30 units and am interested in being an AGS Peer Mentor", "I am new to AGS or SMC and am interested in being paired with an AGS Peer Mentor.", "Not Applicable"] }
    } else if (type === "EOP_Scholars_Choice") {
        return { name: "eop_gaurdian", title: "Are you in the EOPS or Guardian Scholars Program?", values: ["EOPS", "Guardian Scholars", 'Neither'] }
    } else if (type === "agreementChoice") {
        return {
            name: "agreements",
            title: "Agreement", values: [
                "I have read the AGS club By-laws. *",
                "My $10 scholarship dues is non-refundable. I understand that dues are paid at www.paypal.com at agssmc2020@gmail.com, within four weeks of submission of this application. ",
                "I will abide by the SMC Code of Conduct, and if I violate the Code of Conduct I may be suspended or expelled from the club and/or reported to the Campus Disciplinarian.",
                "I am subject to removal of the club for any misconduct, including falsely reporting the completion of hours, socials, or attendance at meetings.",
                "I will not receive three negative ones (explained at the general meetings).",
            ]
        }
    } else if (type === "meetingTimeChoice") {
        return { name: "meetingAvailability", title: "Which meeting time will you be able to join the general meeting on Thursday? *", values: ["11:15 AM to 12:35 PM", "6:00 to 7:20 PM"] }
    } else if (type === "gpaChoice") {
        return { name: "gpa", title: "Your GPA: ", values: ["Greater than 3.0", "Less than 3.0"] }
    } else if (type === 'priorMemberChoice') {
        return { name: "priorMember", title: "Were you a member of SMC AGS?", values: ["Yes", "No"] }
    } else if (type === 'permanentMemberChoice') {
        return { name: "permanentMember", title: "Are you an AGS permanent member?", values: ["Yes, I am a permanent member", "No, I am a permanent member"] }
    }

    return {}
}

function reducer(state, action) {
    switch (action.type) {
        case 'updateSelect':
            return { ...state, [action.payload.item]: action.payload.value };
        case 'addCheckBox':
            let addedArray = state[action.payload.item].concat([`${action.payload.value}`])
            return { ...state, [action.payload.item]: addedArray }
        case 'removeCheckBox':
            let newCheckArray = state[action.payload.item].filter(item => item !== action.payload.value)
            return { ...state, [action.payload.item]: newCheckArray };
        default:
            throw new Error();
    }
}
