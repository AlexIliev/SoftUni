namespace Customer
{
    using System;
    using System.Collections.Generic;

    class CustomerTest
    {
        static void Main()
        {
            try
            {
                //Creates database for clients           
                Payments paymentFirstCustomer = new Payments("GSM Sony Ericson", 760m);
                List<Payments> listOfPaymentsForFirstCustomer = new List<Payments>()
                {
                    paymentFirstCustomer
                };
                Customer firstCustomer = new Customer("Ivan", "Petrov", "Ivanov", "8434532132", "Sofia, J.K. Knyazevo", "09871234356",
                    "dsad@abv.bg", listOfPaymentsForFirstCustomer, CustomerType.OneTime);

                Payments paymentSecondCustomerOne = new Payments("GSM Nokia", 460m);
                Payments paymentSecondCustomerTwo = new Payments("Lenovo",1230m);
                Payments paymentSecondCustomerThree = new Payments("Panasonic", 1321.50m);
                List<Payments> listOfPaymentsForSecondCustomer = new List<Payments>()
                {
                    paymentSecondCustomerOne,
                    paymentSecondCustomerTwo,
                    paymentSecondCustomerThree
                };

                Customer secondCustomer = new Customer("Bogdan", "Cvtenaov", "Aleksiev", "8434576040", "Sofia, J.K. Krasna Polyana", "07871243358",
                    "dsad@abv.bg", listOfPaymentsForSecondCustomer, CustomerType.Regular);

                Payments paymentThirdCustomerOne = new Payments("HTC One", 1460m);
                Payments paymentThirdCustomerTwo = new Payments("Sony Vayo", 1939.99m);
                Payments paymentThirdCustomerThree = new Payments("Toshiba", 1521.90m);
                List<Payments> listOfPaymentsForThirdCustomer = new List<Payments>()
                {
                    paymentThirdCustomerOne,
                    paymentThirdCustomerTwo,
                    paymentThirdCustomerThree
                };

                Customer thirdCustomer = new Customer("Bogdan", "Cvtenaov", "Aleksiev", "9434576040", "Sofia, J.K. Krasno Selo", "09871249758",
                    "dsad@abv.bg", listOfPaymentsForThirdCustomer, CustomerType.Golden);

                //Create a list of clients
                Customer[] customers = new Customer[]
                {
                    firstCustomer,
                    secondCustomer,
                    thirdCustomer
                };

                //Sort a list of clients by full name and id
                Array.Sort(customers);

                foreach (var customer in customers)
                {
                    Console.WriteLine(customer);
                    Console.WriteLine();
                }
            }
            catch (ArgumentNullException emptyValueException)
            {
                Console.WriteLine("Error input!" + emptyValueException);
            }
            finally
            {
                Console.WriteLine("End of the program!");
            }
                      
        }
    }
}