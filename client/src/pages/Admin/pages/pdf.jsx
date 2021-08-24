import { Document,Page,Text,View,StyleSheet,PDFDownloadLink,PDFViewer, Image } from "@react-pdf/renderer";
import logo from "../../../media/logo.png"
import {Table, TableBody, TableHeader, TableCell} from "@david.kucsai/react-pdf-table"
import ReactToPrint from "react-to-print";
import {useReactToPrint} from "react-to-print";
import {forwardRef, useRef} from "react";
import "../../../css/pdf.css"
import devConsole from "../../../utils/devConsole";

function CapitalizeEachWord(string){
  return string.split(' ').map(element => {
      return element[0].toUpperCase() + element.slice(1).toLowerCase()
  }).join(' ');
}

export function PDFFromDataVolunteerPatient(props){
    const data=props?.data||{}
	if (Object.keys(data).length===0){
		devConsole.error("PDFFromDataVolunteerPatient props.data is invalid")
		return <></>
	}
    const type=(data?.["cancer type"]!==null && data?.["cancer type"]!==undefined)?"patient":"volunteer"
    console.log(data,type)
    return(
        <div className="document">
        <div className="header">
          <div className="name">
            <h1>{data["last name"]||"last name"}</h1>
            <h2>{data["first name"]}</h2>
          </div> 
          <img className='logo' src={logo} alt='Rock Cancer Care Logo'/>
        </div>
        <div className="section">
          <div className="row">
            <div className="space span3">
              <div className="header">Street Address</div>
              <div className="content">{data["street address"]}</div>
            </div>
            <div className="space span2">
              <div className="header">Zip</div>
              <div className="content">{data["zip"]}</div>
            </div>
            <div className="space span2">
              <div className="header">Gender</div>
              <div className="content">{CapitalizeEachWord(data["gender"])}</div>
            </div>
            <div className="space span2">
              <div className="header">Date of Birth</div>
              <div className="content">{data["birth date"]}</div>
            </div>
            <div className="space span3">
              <div className="header">Phone</div>
              <div className="content">{data["phone"]}</div>
            </div>
          </div>
          <div className="row">
            <div className="space span5">
              <div className="header">Email</div>
              <div className="content">{data["email"]}</div>
            </div>
            <div className="space span4">
              <div className="header">Relationship Status</div>
              <div className="content">{data["relationship status"]}</div>
            </div>
            {(type === "patient")?
              <div className="space span3">
                <div className="header">Leave a Message</div>
                <div className="content">{CapitalizeEachWord(data["leave a message"])}</div>
              </div>
            :""}
          </div>
          {(type === "volunteer")? 
            <div className="row">
              <div className="space span12">
                <div className="header">Name and Age of Children Volunteering</div>
                <div className="content">{(data?.["children volunteers"]!==undefined && data?.["children volunteers"]?.length === 0)?'n/a':data?.["children volunteers"]?.join?.(', ')}</div>
              </div>  
            </div>
          :null}
          {(type==="volunteer")?
            <>
            <div className="row">
              <div className="space span5">
                <div className="header">Preferred Point of Contact</div>
                <div className="content">{(data?.["preferred point of contact"]!==undefined && data?.["preferred point of contact"]?.length === 0)?'n/a':data?.["preferred point of contact"]?.join?.(', ')}</div>
              </div>
              <div className="space span4">
                <div className="header">Best time to Contact</div>
                <div className="content">{data["best time to contact"]}</div>
              </div>
              <div className="space span3">
                <div className="header">Convicted of a felony</div>
                <div className="content">{data['convicted of a felony']}</div>
              </div>
            </div>
            <div className="row">
              <div className="space span5">
                <div className="header">Occupation</div>
                <div className="content">{data["financial occupation"]}</div>
              </div>
              <div className="space span6">
                <div className="header">Employer</div>
                <div className="content">{data['employer']}</div>
              </div>
            </div>
            </>
          :null}
        </div>
        {(type==="volunteer")?
          <div className="section">
            <div className="row">
              <div className="space span5">
                <div className="header">Reference name(last, first)</div>
                <div className="content">{CapitalizeEachWord(data["reference last name"]+', '+data["reference first name"])}</div>
              </div>
              <div className="space span4">
                <div className="header">Email</div>
                <div className="content">{data["reference email"]}</div>
              </div>
              <div className="space span3">
                <div className="header">Relationship to Volunteer</div>
                <div className="content">{data['reference relationship to volunteer']}</div>
              </div>
            </div>
            <div className="row">
              <div className="space span3">
                <div className="header">Street Address</div>
                <div className="content">{data['reference street address']}</div>
              </div>
              <div className="space span2">
                <div className="header">Zip</div>
                <div className="content">{data['reference zip']}</div>
              </div>
              <div className="space span5">
                <div className="header">Phone</div>
                <div className="content">{data['reference phone']}</div>
              </div>
            </div>
          </div>
        :null}
        {(type==="patient")?
          <div className="section">
            <div className="row">
              {(data["filled out by"] !== "Patient")?
                <div className="space span5">
                  <div className="header">Filler name(last, first)</div>
                  <div className="content">{CapitalizeEachWord(data["filler last name"]+', '+data["filler first name"])}</div>
                </div>
              :null}
              <div className="space span3">
                <div className="header">Filler Relationship to Patient</div>
                <div className="content">{data["filled out by"]}</div>
              </div>
            </div>
            {(data["filled out by"] !=="Patient")?
            <div className='row'>
                <div className="space span5">
                  <div className="header">Phone</div>
                  <div className="content">{data['filler phone']}</div>
                </div>
                <div className="space span5">
                  <div className="header">Email</div>
                  <div className="content">{data['filler email']}</div>
                </div>
            </div>
              :null}
          </div>
        :null}
        {(type==="patient")?
          <div className="section">
            <div className="row">
              <div className="space span4">
                <div className="header">Type of Cancer</div>
                <div className="content">{data['cancer type']}</div>
              </div>
              <div className="space span3">
                <div className="header">Date of Diagnosis</div>
                <div className="content">{data['date of diagnosis']}</div>
              </div>
              <div className="space span5">
                <div className="header">State of Diagnosis</div>
                <div className="content">{data['diagnosis status']}</div>
              </div>
            </div>
            <div className="row">
              <div className="space span5">
                <div className="header">Doctor name (last, first)</div>
                <div className="content">{CapitalizeEachWord(data["doctor last name"]+', '+data["doctor first name"])}</div>
              </div>
              <div className="space span3">
                <div className="header">Phone</div>
                <div className="content">{data['doctor phone']}</div>
              </div>
              <div className="space span4">
                <div className="header">Walker/crutches/cane/wheelchair</div>
                <div className="content">{data['walker, crutches, wheelchair']}</div>
              </div>
            </div>
            <div className="row2">
              <div className="space height2 span6">
                <div className="header">Allergies</div>
                <div className="content">{(data['allergies']==="")?'n/a':data['allergies']}</div>
              </div>
              <div className="space height2 span6">
                <div className="header">Medical Conditions</div>
                <div className="content">{(data?.["medical conditions"]!==null && data?.["medical conditions"]!==undefined && data?.["medical conditions"]?.length ===0)?'n/a':data?.["medical conditions"]?.join?.(', ')}</div>
              </div>
            </div>
            <div className="row2">
            <div className="space height2 span12">
                <div className="header">Patient description of living with medical conditions or substance abuse</div>
                <div className="content">
                    {data['living conditions explanation']}
                </div>
              </div>
            </div>
          </div>
        :null}
        {(type==="patient")?
          <div className="section">
            <div className="row">
              <div className="space span6">
                <div className="header">Emergency Contact name(last, first)</div>                
                <div className="content">{CapitalizeEachWord(data["emergency contact last name"]+', '+data["emergency contact first name"])}</div>
              </div>
              <div className="space span6">
                <div className="header">Email</div>
                <div className="content">{data['emergency contact email']}</div>
              </div>
            </div>
            <div className="row">
              <div className="space span3">
                <div className="header">Street Address</div>
                <div className="content">{data['emergency contact street address']}</div>
              </div>
              <div className="space span2">
                <div className="header">Zip</div>
                <div className="content">{data['emergency contact zip']}</div>
              </div>
              <div className="space span5">
                <div className="header">Phone</div>
                <div className="content">{data['emergency contact phone']}</div>
              </div>
            </div>
          </div>
        :null}
        {(type==="patient")?
          <div className="section">
            <div className="row2">
              <div className="space height2 span6">
                <div className="header">Program Selection</div>
                <div className="content">{(data?.["program selection"]!==null && data?.["program selection"]!==undefined && data?.["program selection"]?.length ===0)?'n/a':data?.["program selection"]?.join?.(', ')}</div>
              </div>
              <div className="space span6">
                <div className="header">Religious Beliefs</div>
                <div className="content">{data['religious beliefs']}</div>
              </div>
              <div className="space span6">
                <div className="header">Open to Prayer</div>
                <div className="content">{data['open to prayer']}</div>
              </div>
            </div>
          </div>
        :null}
        {(type==="patient")?
          <div className="section">
            <div className="row">
              <div className="space span3">
                <div className="header">Financial need?</div>
                <div className="content">{data['Financial assistance']}</div>
              </div>
              <div className="space span3">
                <div className="header">Income Level</div>
                <div className="content">{data['financial income level']}</div>
              </div>
              <div className="space span6">
                <div className="header">Income Source</div>
                <div className="content">{data['financial income source']}</div>
              </div>
            </div>
            <div className="row">
              <div className="space span12">
                <div className="header">Financial Services</div>
                <div className="content">{(data?.["financial services needed"]!==null && data?.["financial services needed"]!==undefined && data?.["financial services needed"]?.length ===0)?'n/a':data?.["medical conditions"]?.join?.(', ')}</div>
              </div>
            </div>
            <div className="row2">
              <div className="space height2 span12">
                <div className="header">Explain your financial hardship and how we can help you.</div>
                <div className="content">
                  {data['financial assistance explanation']}
                </div>
              </div>
            </div>
            <div className="row2">
              <div className="space height2 span12">
                <div className="header">How will financial assitance help you heal</div>
                <div className="content">
                  {data['financial healing explanation']}
                </div>
              </div>
            </div>
          </div>
        :null}
        {(type==="volunteer")?<>
          <div className="section">
            <div className="row">
              <div className="space span3">
                <div className="header">Has been a Christian for</div>
                <div className="content">{data['been a christian']}</div>
              </div>
              <div className="space span3">
                <div className="header">Has attended the Rock for</div>
                <div className="content">{data['rock attendance']}</div>
              </div>
              <div className="space span6">
                <div className="header">Campus</div>
                <div className="content">{data['rock campus']}</div>
              </div>
            </div>
            <div className="row2">
              <div className="space height2 span6">
                <div className="header">Serving Interests</div>
                <div className="content">{(data?.["serving interests"]!==null && data?.["serving interests"]!==undefined && data?.["serving interests"]?.length ===0)?'n/a':data?.["medical conditions"]?.join?.(', ')}</div>
              </div>
              <div className="space span3">
                <div className="header">Consider leader</div>
                <div className="content">{data['consider leader']}</div>
              </div>
              <div className="space span3">
                <div className="header">Spiritual Gifts Test</div>
                <div className="content">{data['spiritual gifts test']}</div>
              </div>
              <div className="space span3">
                <div className="header">Commit to 6 months</div>
                <div className="content">{data['commit to 6 months of service']}</div>
              </div>
              <div className="space span3">
                <div className="header">Previous Volunteering</div>
                <div className="content">{data['past volunteer experience']}</div>
              </div>
            </div>
          </div>
          <div className="section">
            <div className="row2">
              <div className="space height2 span12">
                <div className="header">Testimony</div>
                <div className="content">
                  {data['testimony of being saved']}
                </div>
              </div>
            </div>
            <div className="row2">
              <div className="space height2 span12">
                <div className="header">Affected by Cancer</div>
                <div className="content">
                  {data['testimony of cancer']}
                </div>
              </div>
            </div>
            <div className="row2">
              <div className="space height2 span12">
                <div className="header">Why choose Rock Cancer Care/ Why volunteer?</div>
                <div className="content">
                  {data['why volunteer']}
                </div>
              </div>
            </div>
            <div className="row2">
              <div className="space height2 span12">
                <div className="header">Most difficult situation as a cancer patient volunteer</div>
                <div className="content">
                  {data['most difficult for volunteering question']}
                </div>
              </div>
            </div>
            <div className="row2">
              <div className="space height2 span12">
                <div className="header">Difficult situation and how they reacted</div>
                <div className="content">
                  {data['describe a difficult situation question']}
                </div>
              </div>
            </div>
            <div className="row2">
              <div className="space height2 span12">
                <div className="header">Healthy boundaries example</div>
                <div className="content">
                  {data['healthy boundaries question']}
                </div>
              </div>
            </div>
          </div>
        </>:null}
      </div>
    )
}