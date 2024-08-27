"use client";
import { useState } from "react";

export default function RegisterForm() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [plan, setPlan] = useState("");
  const [gender, setGender] = useState("");
  const [buyBottle, setBuyBottle] = useState(false);
  const [buyShoes, setBuyShoes] = useState(false);
  const [buyCap, setBuyCap] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const inputFnameOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFname(event.target.value);
  };

  const inputLnameOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLname(event.target.value);
  };

  const selectPlanOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPlan(event.target.value);
  };

  const radioGenderOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender(event.target.value);
  };

  const cbBuyBottleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBuyBottle(event.target.checked);
  };

  const cbBuyShoesOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBuyShoes(event.target.checked);
  };

  const cbBuyCapOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBuyCap(event.target.checked);
  };

  const cbAgreeOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAgreed(event.target.checked);
  };

  const computeTotalPayment = () => {
    let total = 0;
    if (plan === "funrun") total += 500;
    if (plan === "mini") total += 800;
    if (plan === "half") total += 1200;
    if (plan === "full") total += 1500;
    if (buyBottle) total += 200;
    if (buyShoes) total += 600;
    if (buyCap) total += 400;

    if (buyBottle && buyShoes && buyCap) {
      total *= 0.8; // Apply 20% discount if all items are selected
    }

    return total;
  };

  const registerBtnOnClick = () => {
    setSubmitted(true);

    if (fname && lname && plan && gender && agreed) {
      alert(
        `Registration complete. Please pay ${computeTotalPayment().toLocaleString()} THB.`
      );
    }
  };

  return (
    <div className="mx-auto vstack gap-3" style={{ width: "400px" }}>
      <h3 className="text-center fst-italic my-4">Register CMU Marathon 🏃‍♂️</h3>
      <div className="d-flex gap-2">
        <div>
          <label className="form-label">First name</label>
          <input
            className={"form-control" + (submitted && !fname ? " is-invalid" : "")}
            onChange={inputFnameOnChange}
            value={fname}
          />
          <div className="invalid-feedback">Please enter your first name</div>
        </div>
        <div>
          <label className="form-label">Last name</label>
          <input
            className={"form-control" + (submitted && !lname ? " is-invalid" : "")}
            onChange={inputLnameOnChange}
            value={lname}
          />
          <div className="invalid-feedback">Please enter your last name</div>
        </div>
      </div>

      <div>
        <label className="form-label">Plan</label>
        <select
          className={"form-select" + (submitted && !plan ? " is-invalid" : "")}
          onChange={selectPlanOnChange}
          value={plan}
        >
          <option value="">Please select..</option>
          <option value="funrun">Fun run 5.5 Km (500 THB)</option>
          <option value="mini">Mini Marathon 10 Km (800 THB)</option>
          <option value="half">Half Marathon 21 Km (1,200 THB)</option>
          <option value="full">Full Marathon 42.195 Km (1,500 THB)</option>
        </select>
        <div className="invalid-feedback">Please select a Plan</div>
      </div>

      <div>
        <label className="form-label">Gender</label>
        <div>
          <input
            className="me-2 form-check-input"
            type="radio"
            value="male"
            onChange={radioGenderOnChange}
            checked={gender === "male"}
          />
          Male 👨
          <input
            className="mx-2 form-check-input"
            type="radio"
            value="female"
            onChange={radioGenderOnChange}
            checked={gender === "female"}
          />
          Female 👩
        </div>
        {submitted && !gender && (
          <div className="text-danger">Please select your gender</div>
        )}
      </div>

      <div>
        <label className="form-label">Extra Item(s)</label>
        <div>
          <input
            className="form-check-input"
            type="checkbox"
            onChange={cbBuyBottleOnChange}
            checked={buyBottle}
          />{" "}
          <label className="form-check-label">Bottle 🍼 (200 THB)</label>
        </div>
        <div>
          <input
            className="form-check-input"
            type="checkbox"
            onChange={cbBuyShoesOnChange}
            checked={buyShoes}
          />{" "}
          <label className="form-check-label">Shoes 👟 (600 THB)</label>
        </div>
        <div>
          <input
            className="form-check-input"
            type="checkbox"
            onChange={cbBuyCapOnChange}
            checked={buyCap}
          />{" "}
          <label className="form-check-label">Cap 🧢 (400 THB)</label>
        </div>
      </div>

      {buyBottle && buyShoes && buyCap && (
        <div className="text-success d-block">(20% Discounted)</div>
      )}

      <div>
        Total Payment: {computeTotalPayment().toLocaleString()} THB
      </div>

      <div>
        <input
          className="me-2"
          type="checkbox"
          onChange={cbAgreeOnChange}
          checked={agreed}
        />
        I agree to the terms and conditions
      </div>

      <button
        className="btn btn-success my-2"
        onClick={registerBtnOnClick}
        disabled={!agreed}
      >
        Register
      </button>
    </div>
  );
}
