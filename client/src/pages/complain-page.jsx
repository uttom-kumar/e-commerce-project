import React, {useEffect} from 'react';
import FeatureStore from "../store/FeatureStore.js";
import Layout from "../component/layout/layout.jsx";
import LegalContents from "../component/features/legal-contents.jsx";

const ComplainPage = () => {
    const {LegalDetailsRequest} = FeatureStore()

    useEffect(() => {
        (async ()=>{
            await LegalDetailsRequest("complain")
        })()
    }, []);

    return (
        <Layout>
            <LegalContents />
        </Layout>
    );
};

export default ComplainPage;