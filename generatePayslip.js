const AUS_TAX_RATES = [
    {min:1, max:20000, rate:0},
    {min:20001, max:40000, rate:.1},
    {min:40001, max:80000, rate:.2},
    {min:80001, max:180000, rate:.3},
    {min:180001, max:false, rate:.4}
]

const NZ_TAX_RATES = [
    {min:1, max:14000, rate:.1},
    {min:14001, max:48000, rate:.17},
    {min:48001, max:70000, rate:.3},
    {min:70001, max:false, rate:.33}
]

let countryTaxRates = new Map();
countryTaxRates.set("Aus", AUS_TAX_RATES)
countryTaxRates.set("NZ", NZ_TAX_RATES)

function validateArgs(args){
    if (args.length!==5){
        //incorrect number of args
        console.log(`Expecting 2 args but received ${args.length-2}`)
        return false
    } else if ((typeof(args[2])!=="string")){
        // incorrect arg type - name isn't string
        console.log("incorrect arg type - name")
        return false
    } else if ((typeof(args[5])!=="string")&&(args[5]==="Aus" || args[5]==="NZ")){
        // incorrect arg type - name isn't string
        console.log("incorrect arg type - country: expected \"Aus\" or \"NZ\"")
        return false
    }
    else if (isNaN(Number(args[3]))){
        // incorrect arg type - gross isn't number
        console.log("incorrect arg type - gross")
        return false
    }
        return true
}

function usage(){

    console.log("USAGE")
    console.log("node generatePayslip.js [Name] [Gross] [Country]")
    console.log("-Name :  the name to be appended to the payslip. Should be in string format")
    console.log("-Gross :  the gross annual amount to calculate income on. Should be a number")
    console.log("-Country :  the country whose tax rates will apply to gross annual payment. Should be either NZ or Aus")
}

function generatePayslip(name, grossAnnual, country){
    let grossMonthly = grossAnnual / 12;
    let tax = 0;
    let taxMonthly;
    let netMonthly;

    countryTaxRates.get(country).forEach((bracket)=>{
        tax += calculateTaxBracket(bracket, grossAnnual)
    })
    taxMonthly = tax/12

    netMonthly = grossMonthly - taxMonthly

    let results = {
        name: name,
        grossMonthly: grossMonthly,
        taxMonthly: taxMonthly,
        netMonthly: netMonthly
    }
    printPayslip(results)
}

function calculateTaxBracket(bracket, grossAnnual){
    let tax=0;
    if (bracket.max && grossAnnual - bracket.max > 0){ //bracket.max condition allows us to set boolean flag rather than numerical limit on last bracket
        tax = (((bracket.max-bracket.min)+1)*bracket.rate); // +1 compensates for tax payed on the 1st dollar per bracket
    } else if (grossAnnual > bracket.min){
        tax = (((grossAnnual-bracket.min)+1)*bracket.rate); // +1 compensates for tax payed on the 1st dollar per bracket
    }
        return tax
}

function printPayslip(payValues){
    console.log(`Monthly Payslip for: \"${payValues.name}\"`)
    console.log(`Gross Monthly Income: $${Number(payValues.grossMonthly).toFixed(2)}`)
    console.log(`Monthly Income Tax: $${Number(payValues.taxMonthly).toFixed(2)}`)
    console.log(`Net Monthly Income: $${Number(payValues.netMonthly).toFixed(2)}`)
}

   if (validateArgs(process.argv)) {
        generatePayslip(process.argv[2], process.argv[3], process.argv[4])
        generatePayslip(name,grossAnnual,country)
    } else {
       usage();
   }



