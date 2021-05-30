import React from 'react';
import BreadCrumb from "../../../components/BreadCrumb";
import { Button, Select, Label, Input } from "@windmill/react-ui";
import { useHistory } from "react-router-dom";
import { Logo, PPK, Komite, Profile } from "../../../components/PageScreen/EditProfileMadrasah"


const EditProfilMadrasah = () => {
    const item = ["Profil"]
    const history = useHistory()
    const [value, setValue] = React.useState("logo")
    const [expanded, setExpanded] = React.useState(true)

    return (
        <>
            <BreadCrumb data={item} title="Edit Profil Madrasah" />
            <nav className=" px-8 pt-2 shadow-md m-2 mx-4 bg-blue-600">
                <div className="-mb-px flex justify-start gap-4 bg-blue-600">
                    <a className="no-underline text-teal-dark text-white border-b-2  border-transparent  uppercase tracking-wide font-bold text-xs py-3 mr-8" href="#" onClick={() => {
                        setValue("logo")
                    }}>
                        Logo
                    </a>
                    <a className="no-underline text-grey-dark border-b-2 text-white  uppercase tracking-wide font-bold text-xs py-3 mr-8" href="#" onClick={() => setValue("ppk")}>
                        PPK
                    </a>
                    <a className="no-underline text-grey-dark border-b-2 text-white border-transparent uppercase tracking-wide font-bold text-xs py-3 mr-8" href="#" onClick={() => setValue("komite")}>
                        Komite
                    </a>
                    <a className="no-underline text-grey-dark border-b-2 text-white border-transparent uppercase tracking-wide font-bold text-xs py-3" href="#" onClick={() => setValue("profile")}>
                        Profile
                    </a>
                </div>
            </nav>
            <div className="flex flex-col bg-white my-2 mx-4 p-4 rounded-sm shadow-md mb-20">
                <div>
                    {
                        value === "logo" && <Logo /> || value === "ppk" && <PPK /> || value === "komite" && <Komite /> || value === "profile" && <Profile />

                    }
                </div>
            </div>
        </>

    )
}

export default EditProfilMadrasah


