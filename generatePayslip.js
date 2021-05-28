const TAX_RATES = [
    {min:1, max:20000, rate:0},
    {min:20001, max:40000, rate:.1},
    {min:40001, max:80000, rate:.2},
    {min:80001, max:180000, rate:.3},
    {min:180001, max:false, rate:.4}
]

function validateArgs(args){

    if (args.length!==4){
        //incorrect number of args
        console.log(`Expecting 2 args but recieved ${args.length-2}`)
        return false
    } else if (typeof(args[2])!=="string"){
        // incorrect arg type - name isnt string
        console.log("incorrect arg type - name")
        return false
    } else if (isNaN(Number(args[3]))){
        // incorrect arg type - gross isnt number
        console.log("incorrect arg type - gross")
        return false
    }
        return true
}

function usage(){

    console.log("USAGE")
    console.log("node generatePayslip.js [Name] [Gross]")
    console.log("-Name :  the name to be appended to the payslip. Should be in string format")
    console.log("-Gross :  the gross annual ammount to calculate income on. Should be a number")

}

function generatePayslip(name, grossAnnual){
    let grossMonthly = grossAnnual / 12;
    let net = 0;
    let tax = 0

    TAX_RATES.forEach((bracket)=>{
        if (bracket.max && grossAnnual - bracket.max > 0){ //bracket.max condition allows us to set boolean flag rather than numerical limit on last bracket
            tax += (((bracket.max-bracket.min)+1)*bracket.rate); // +1 compensates for tax payed on the 1st dollar per bracket
        } else if (grossAnnual > bracket.min){
            tax += ((grossAnnual-bracket.min+1)*bracket.rate); // +1 compensates for tax payed on the 1st dollar per bracket
        }
    })

    tax = tax/12

    net = (grossMonthly) - tax

    console.log(`Monthly Payslip for: \"${name}\"`)
    console.log(`Gross Monthly Income: $${Number(grossMonthly).toFixed(2)}`)
    console.log(`Monthly Income Tax: $${Number(tax).toFixed(2)}`)
    console.log(`Net Monthly Income: $${Number(net).toFixed(2)}`)

}

if (validateArgs(process.argv)){
    generatePayslip(process.argv[2], process.argv[3])
} else{
    usage();
}
