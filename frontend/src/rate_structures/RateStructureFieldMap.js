const RateStructureFieldMap = {
    'Flat Rate': ['flatRate'],
    'Seasonal Rate': ['seasonalRateField1', 'seasonalRateField2'],
    'Monthly Rate': [
      'monthlyRate1', 'monthlyRate2', 'monthlyRate3', 'monthlyRate4',
      'monthlyRate5', 'monthlyRate6', 'monthlyRate7', 'monthlyRate8',
      'monthlyRate9', 'monthlyRate10', 'monthlyRate11', 'monthlyRate12'
    ],
    'Tiered Rate': [
      'lowTierPrice', 'lowTierMaxLoad', 'mediumTierPrice', 'mediumTierMaxLoad',
      'highTierPrice', 'highTierMaxLoad'
    ],
    'Seasonal Tiered Rate': [
      'summerLowTierPrice', 'summerLowTierMaxLoad', 'summerMediumTierPrice', 'summerMediumTierMaxLoad',
      'summerHighTierPrice', 'summerHighTierMaxLoad', 'winterLowTierPrice', 'winterLowTierMaxLoad',
      'winterMediumTierPrice', 'winterMediumTierMaxLoad', 'winterHighTierPrice', 'winterHighTierMaxLoad'
    ],
    'Monthly Tiered Rate': [
      'januaryLowPrice', 'januaryLowMaxLoad', 'januaryMediumPrice', 'januaryMediumMaxLoad',
      'januaryHighPrice', 'januaryHighMaxLoad', 'februaryLowPrice', 'februaryLowMaxLoad',
      'februaryMediumPrice', 'februaryMediumMaxLoad', 'februaryHighPrice', 'februaryHighMaxLoad',
      'marchLowPrice', 'marchLowMaxLoad', 'marchMediumPrice', 'marchMediumMaxLoad',
      'marchHighPrice', 'marchHighMaxLoad', 'aprilLowPrice', 'aprilLowMaxLoad',
      'aprilMediumPrice', 'aprilMediumMaxLoad', 'aprilHighPrice', 'aprilHighMaxLoad',
      'mayLowPrice', 'mayLowMaxLoad', 'mayMediumPrice', 'mayMediumMaxLoad',
      'mayHighPrice', 'mayHighMaxLoad', 'juneLowPrice', 'juneLowMaxLoad',
      'juneMediumPrice', 'juneMediumMaxLoad', 'juneHighPrice', 'juneHighMaxLoad',
      'julyLowPrice', 'julyLowMaxLoad', 'julyMediumPrice', 'julyMediumMaxLoad',
      'julyHighPrice', 'julyHighMaxLoad', 'augustLowPrice', 'augustLowMaxLoad',
      'augustMediumPrice', 'augustMediumMaxLoad', 'augustHighPrice', 'augustHighMaxLoad',
      'septemberLowPrice', 'septemberLowMaxLoad', 'septemberMediumPrice', 'septemberMediumMaxLoad',
      'septemberHighPrice', 'septemberHighMaxLoad', 'octoberLowPrice', 'octoberLowMaxLoad',
      'octoberMediumPrice', 'octoberMediumMaxLoad', 'octoberHighPrice', 'octoberHighMaxLoad',
      'novemberLowPrice', 'novemberLowMaxLoad', 'novemberMediumPrice', 'novemberMediumMaxLoad',
      'novemberHighPrice', 'novemberHighMaxLoad', 'decemberLowPrice', 'decemberLowMaxLoad',
      'decemberMediumPrice', 'decemberMediumMaxLoad', 'decemberHighPrice', 'decemberHighMaxLoad'
    ],
    'Time of Use': [
      'summerOnPeakPrice', 'summerMidPeakPrice', 'summerOffPeakPrice',
      'winterOnPeakPrice', 'winterMidPeakPrice', 'winterOffPeakPrice', 
      'summerOnTimeRange', 'summerMidTimeRange', 'winterOnTimeRange', 'winterMidTimeRange'
    ],
  };
  
  export default RateStructureFieldMap;
  