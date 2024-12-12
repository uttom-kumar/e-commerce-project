import Layout from "../component/layout/layout.jsx";
import LegalContents from "../component/features/legal-contents.jsx";
import FeatureStore from "../store/FeatureStore.js";
import {useEffect} from "react";

const AboutPage = () => {
    const {LegalDetailsRequest} = FeatureStore()

    useEffect(() => {
        (async ()=>{
            await LegalDetailsRequest("about")
        })()
    }, []);

    return (
        <Layout>
            <LegalContents />
        </Layout>
    );
};

export default AboutPage;