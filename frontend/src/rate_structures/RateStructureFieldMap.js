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
      'januaryLowPrice', 'januaryLowMaxLoad', 'januaryMedPrice', 'januaryMedMaxLoad',
      'januaryHighPrice', 'januaryHighMaxLoad', 'februaryLowPrice', 'februaryLowMaxLoad',
      'februaryMedPrice', 'februaryMedMaxLoad', 'februaryHighPrice', 'februaryHighMaxLoad',
      'marchLowPrice', 'marchLowMaxLoad', 'marchMedPrice', 'marchMedMaxLoad',
      'marchHighPrice', 'marchHighMaxLoad', 'aprilLowPrice', 'aprilLowMaxLoad',
      'aprilMedPrice', 'aprilMedMaxLoad', 'aprilHighPrice', 'aprilHighMaxLoad',
      'mayLowPrice', 'mayLowMaxLoad', 'mayMedPrice', 'mayMedMaxLoad',
      'mayHighPrice', 'mayHighMaxLoad', 'juneLowPrice', 'juneLowMaxLoad',
      'juneMedPrice', 'juneMedMaxLoad', 'juneHighPrice', 'juneHighMaxLoad',
      'julyLowPrice', 'julyLowMaxLoad', 'julyMedPrice', 'julyMedMaxLoad',
      'julyHighPrice', 'julyHighMaxLoad', 'augustLowPrice', 'augustLowMaxLoad',
      'augustMedPrice', 'augustMedMaxLoad', 'augustHighPrice', 'augustHighMaxLoad',
      'septemberLowPrice', 'septemberLowMaxLoad', 'septemberMedPrice', 'septemberMedMaxLoad',
      'septemberHighPrice', 'septemberHighMaxLoad', 'octoberLowPrice', 'octoberLowMaxLoad',
      'octoberMedPrice', 'octoberMedMaxLoad', 'octoberHighPrice', 'octoberHighMaxLoad',
      'novemberLowPrice', 'novemberLowMaxLoad', 'novemberMedPrice', 'novemberMedMaxLoad',
      'novemberHighPrice', 'novemberHighMaxLoad', 'decemberLowPrice', 'decemberLowMaxLoad',
      'decemberMedPrice', 'decemberMedMaxLoad', 'decemberHighPrice', 'decemberHighMaxLoad'
    ],
    'Time of Use': [
      'summerOnPeakPrice', 'summerMidPeakPrice', 'summerOffPeakPrice',
      'winterOnPeakPrice', 'winterMidPeakPrice', 'winterOffPeakPrice', 
      'summerOnTimeRange', 'summerMidTimeRange', 'winterOnTimeRange', 'winterMidTimeRange'
    ],
  };
  
  export default RateStructureFieldMap;
  