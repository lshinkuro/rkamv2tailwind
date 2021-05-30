import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import ImageLight from "../../assets/img/logo-kemenag.png";
import ImageDark from "../../assets/img/logo-kemenag.png";
import { Container, SubContainer, MainDiv,TextHeader } from './style';
import {InputWithLabel,LinkButton} from "../../components/InputComponent"
import { Label, Input, Button, HelperText } from "@windmill/react-ui";

import { PreLogin } from "../../services/auth";

function Step2() {
  const [user, setUser] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [Message, setMessage] = useState<string>("");
  const route = useHistory();

  const authJson: any = localStorage.getItem("auth");
  const authStore = JSON.parse(authJson);

  useEffect(() => {
    if (authStore) {
      if (authStore.isLogin) {
        route.push("/");
      }
    } else {
      const defPayload = {
        isLogin: false,
        token: "",
        kode_role: "",
        group_role: "",
      };
      const defVal = JSON.stringify(defPayload);
      localStorage.setItem("auth", defVal);
    }
  }, [authStore, route]);

  const login = async () => {
    if (user === "") {
      setMessage("Email atau NIK tidak boleh kosong");
    } else if (pass === "") {
      setMessage("Password Tidak Boleh Kosong");
    } else {
      try {
        const payload = {
          username: user,
          password: pass,
        };
        const res = await PreLogin(payload);
        const data: any = res.return;
        console.log(res.meta.success);
        if (res.meta.success === "STEP_2") {
          const step2 = {
            user: user,
            pass: pass,
            mad: res.return.madrasah.nama,
            mId: res.return.madrasah.id,
          };
          console.log(res.return.madrasah.id);
          route.push({
            pathname: "/step-2-login",
            state: step2,
          });
        } else {
          data["isLogin"] = true;
          const value = JSON.stringify(data);
          localStorage.setItem("auth", value);
          route.push("/");
        }
      } catch (err) {
        if (err.response) {
          setMessage(`${err.response.data.return}`);
        } else {
          setMessage("Kombinasi Username dan Password salah");
        }
      }
    }
  };
  return (
    <Container>
      <SubContainer>
        <MainDiv>
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-fill w-6 md:w-auto dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-fill w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-12 sm:p-12 md:w-1/2">
            <div className="w-full">
              <TextHeader>
                Rencana Kerja dan Anggaran Madrasah Berbasis Elektronik
              </TextHeader>
              <span className="text-red-600">{Message}</span>
              <InputWithLabel
                label="Email"
                inputOnChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                  setUser(e.target.value)
                }
                valid={
                  user.match(
                    "^([0-9]{9})|([A-Za-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3})$"
                  )
                    ? true
                    : user.length !== 0
                      ? false
                      : Message
                        ? false
                        : true
                }

                inputValue=""
                inputPlaceholder="ahmad@gmail.com"
                type="email"
              />
              <HelperText className="text-red-500">
                {user.match(
                  "^([0-9]{9})|([A-Za-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3})$"
                )
                  ? ""
                  : user.length !== 0
                    ? "Email atau NIK tidak valid"
                    : Message && ""}
              </HelperText>

              <InputWithLabel
                label="Password"
                inputOnChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                  setPass(e.target.value)
                }
                onKeyPress={(ev) => {
                  if (ev.key === "Enter") {
                    ev.preventDefault();
                    login();
                  }
                }}
                valid={
                  pass.length === 0 ? true : pass.length < 8 ? false : true
                }
                inputValue=""
                inputPlaceholder="***************"
                type="password"
              />
              <HelperText className="text-red-500">
                {pass.length === 0
                  ? ""
                  : pass.length < 8
                    ? "password minimal 8 karakter"
                    : ""}
              </HelperText>

              <Button onClick={() => login()} className="mt-4" block>
                Masuk
              </Button>

              <hr className="my-8" />
              <LinkButton name="Lupa password ?" to="/forgot-password" />
              <LinkButton name="Buat Akun" to="/kode-registrasi" />
            </div>
          </main>
        </MainDiv>
      </SubContainer>
    </Container>
  );
}

export default Step2;



