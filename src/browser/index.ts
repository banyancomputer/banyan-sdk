const {DealConfiguration, DealProposal, DealStatus, Deal} = require('../index');

interface DealMakerOptions {
    creator_address: string; // The address of the creator of the deal
    deal_configuration: typeof DealConfiguration; // The configuration of the deal
}


class DealMaker {
    private options: DealMakerOptions;
    constructor(options: DealMakerOptions) {
        this.options = options;
    }
}

export {DealMaker};