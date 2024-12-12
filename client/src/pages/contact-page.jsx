import React, {useEffect} from 'react';
import FeatureStore from "../store/FeatureStore.js";
import Layout from "../component/layout/layout.jsx";
import LegalContents from "../component/features/legal-contents.jsx";

const ContactPage = () => {
    const {LegalDetailsRequest} = FeatureStore()

    useEffect(() => {
        (async ()=>{
            await LegalDetailsRequest("contact")
        })()
    }, []);

    return (
        <Layout>
            <LegalContents />
        </Layout>
    );
};

export default ContactPage;