module.exports = {
  "policies" : [
    {
      "id":"1",
      "name":"الاصدقاء",
      "description" : "هذي السياسة ستفرض على اصدقاء الشركة"
    },
    {
      "id":"2",
      "name":"الاقارب",
      "description" : "هذي السياسة ستفرض على الاقرباء"
    },
    {
      "id":"3",
      "name":"الشركاء",
      "description" : "هذي السياسة ستفرض على الشركاء"
    }
  ],
  "policy" : {
    "id":"2",
    "name":"الاقارب",
    "description" : "هذي السياسة ستفرض على الاقرباء"
  },
  "productPolicies" : [
    {
      "policy" : "1",
      "product" : {
        "id" : "1",
        "package" : {
          "renewPrice" : 400,
          "GBPrice" : 20
        }
      },
      "policyPrice" : 400
    },
    {
      "policy" : "1",
      "product" : {
        "id" : "2"
      },
      "policyPrice" : 300
    }
  ]
};