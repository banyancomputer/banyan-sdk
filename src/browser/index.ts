const {DealConfiguration, DealProposal, DealStatus, Deal} = require('../index');
import Subject from 'rxjs';

interface DealMakerOptions {
    // Required
    creator_address: string; // The address of the creator of the deal
    deal_configuration: typeof DealConfiguration; // The configuration of the deal

    // Optional
    estuary_api_key?: string // The API key for the Estuary API;
}

interface StagingState {
    total: number;
    secondsRemaining: number;
    secondsElapsed: number;
    bytesPerSecond: number;
}

const intialStagingState: StagingState = {
    total: 0,
    secondsRemaining: 0,
    secondsElapsed: 0,
    bytesPerSecond: 0
}

/**
 * A class for handling staging files to Estuary.
 * This class should use XMLHttpRequest to upload files to Estuary, and store progress in a Subject.
 * This Subject should be readable from a React component with a reference to an instance of this class.
 */
export class EstuaryStager {
    private stagingState: StagingState;
    private file: File;
    private apiKey: string;

    constructor(file: File, apiKey: string) {
        // Set the initial state
        this.stagingState = intialStagingState;
        this.stagingState.total = file.size;

        this.file = file;
        this.apiKey = apiKey;
    }

    // upload = async () => {
    //     if (!this.file) {
    //         alert('Broken file constructor.');
    //         return;
    //     }
    //
    //     // Declare a Request object to handle the upload.
    //     let xhr = new XMLHttpRequest();
    //     let startTime = new Date().getTime();
    //     let secondsElapsed = 0;
    //
    //     // A handler for tracking the progress of the Upload.
    //     xhr.upload.onprogress = async (event) => {
    //         if (!startTime) {
    //             startTime = new Date().getTime();
    //         }
    //
    //         secondsElapsed = (new Date().getTime() - startTime) / 1000;
    //         let bytesPerSecond = event.loaded / secondsElapsed;
    //         let secondsRemaining = (event.total - event.loaded) / bytesPerSecond;
    //
    //         this.setState({
    //             ...this.state,
    //             loaded: event.loaded,
    //             total: event.total,
    //             secondsElapsed,
    //             bytesPerSecond,
    //             secondsRemaining,
    //         });
    //     };
    //
    //     // A handler for catching upload errors.
    //     xhr.upload.onerror = async () => {
    //         alert(`Error uploading file to staging: ${xhr.status}`);
    //         startTime = null;
    //         secondsElapsed = 0;
    //     };
    //
    //     // A handler for catching upload success.
    //     xhr.onloadend = (event: any) => {
    //         if (!event.target || !event.target.response) {
    //             return
    //         }
    //
    //         startTime = null;
    //         secondsElapsed = 0;
    //         if (event.target.status === 200) {
    //             let contentAddResponse = {}
    //             try {
    //                 // This returns a JSON object with the CID and the Blake3 hash of the file.
    //                 contentAddResponse = JSON.parse(event.target.response) as ContentAddResponse;
    //             } catch (e) {
    //                 console.log(e);
    //             }
    //             this.setState({ ...this.state, contentAddResponse });
    //             // Finalize the deal proposal based on the response from the staging server (CID, Blake3 hash, etc.)
    //             this.finalizeDealProposal();
    //         } else {
    //             alert(`[${event.target.status}]Error during the upload: ${event.target.response}`);
    //         }
    //     };
    //
    //     // Declare a new FormData object to hold our Upload data.
    //     const formData = new FormData();
    //     // Add our data to the FormData object.
    //     formData.append('data', file, file.filename);
    //     // Extract our Auth Token from the cookies.
    //     const token = Cookies.get(C.auth);
    //
    //     let targetURL = `${C.api.host}/content/add`;
    //     if (this.props.viewer.settings.uploadEndpoints && this.props.viewer.settings.uploadEndpoints.length) {
    //         targetURL = this.props.viewer.settings.uploadEndpoints[0];
    //     }
    //
    //     /* TODO: Why isn't this just in a Post Request? */
    //     xhr.open('POST', targetURL);
    //     xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    //     xhr.send(formData);
    //     this.setState({ ...this.state, loaded: 1 });
    // };

/**
 * This class is used to create deals on the Banyan network.
 * It is supposed to be used by a Browser client.
 */
class DealMaker {
    // private options: DealMakerOptions;
    // constructor(options: DealMakerOptions) {
    //     this.options = options;
    // }
    // // Constucts a DealProposal from a DealConfiguration and a File
    // public generateDealProposal(file: File): DealProposal {
    //
    // }
}

export {DealMaker};

// Helpers and Requests

// Long-winded way of describing return type of /content/add endpoint
export interface ContentAddResponse {
    cid: string;
    blake3hash: string; // TODO: add blake3 to the response
    retrievalUrl: string;
    estuaryId: string; // I feel like this is a bad name. TODO: rename
    providers: string[]; // note/TODO (al): Not really sure what this is for...
}

/**
 * @description Upload a file to Staging and return the CID and Blake3 hash.
 * @param {File} file - The file to upload.
 * @param {string} key - The key to use for the upload.
 * @returns {Promise<{cid: string, blake3: string}>} - The CID and Blake3 hash of the file.
 */
