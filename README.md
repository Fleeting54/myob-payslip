# Payslip Generator

### by Andrew Buissink

### Description
A small command line utility to generate a monthly payslip given an annual gross salary and based on the below tax rates

|Taxable Income|Tax on this Income|
|---------------------------:|---------------------------:|
|$0-$20,000|$0|
|$20,001-$40,000|10c for each $1 over $20,000|
|$40,001-$80,000|20c for each $1 over $40,000|
|$80,001-$180,000|30c for each $1 over $80,000|
|$180,001 and over|40c for each $1 over $180,000|

### Running the script
the script is built to run in a nodeJS environment.
node can be installed from their website: https://nodejs.org/en/

once installed the script can be run from the root folder with the command `node generatePayslip.js <name> <gross>`
#### Usage
    node generatePayslip.js [Name] [Gross]

    -Name :  the name to be appended to the payslip. Should be in string format

    -Gross :  the gross annual ammount to calculate income on. Should be a number