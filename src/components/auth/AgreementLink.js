import React, { useState } from 'react';
import { connect } from 'react-redux';

const AgreementLink = () => {
    const [type, setType] = useState(0);
    const handleChange = () => {

    }
    return (
        <div>
            By Continuing, you agree to Yoc's Term of Use and confirm that you have read Yoc's Privacy Policy.
        </div>
    )    
}

export default AgreementLink;