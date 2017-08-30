// export interface CampaignItem {
//     campaign: CampaignInfo;
// }

export interface CampaignInfo {
    candidate_id: number;
    candidate_name: string;
    campaigns: Campaign[];
}

export interface Campaign {
    campaignId: number;
    candidateId: number;
    candidate_name: string;
    candidate_party: string;
    candidate_position: string;
    election_cycle: string;
    election_year: number;
    campaignSummary: CampaignSummary[];
}

export interface CampaignSummary {
    campaignId: number;
    summaryLevel: string;
    summaryType: string;
    summaryValue: number;
}
