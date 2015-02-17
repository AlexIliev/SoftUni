namespace Customer
{
    using System;

    public class Payments
    {
        private string productName;
        private decimal price;

        public Payments(string productName, decimal price)
        {
            this.ProductName = productName;
            this.Price = price;
        }

        public string ProductName
        {
            get
            {
                return this.productName;
            }
            set
            {
                if (String.IsNullOrEmpty(value))
                {
                    throw new ArgumentNullException("Product name cannot be empty!");
                }
                this.productName = value;
            }
        }

        public decimal Price
        {
            get
            {
                return this.price;
            }
            set
            {
                if (value < 0)
                {
                    throw new ArgumentNullException("Price cannot be negative value!");
                }
                this.price = value;
            }
        }

        public object Clone()
        {
            Payments payment = new Payments(this.ProductName, this.Price);

            payment.ProductName = this.ProductName;
            payment.Price = this.Price;

            return payment;
        }

        public override string ToString()
        {
            string paymentsOutput = String.Format("Product name: {0}\nPrice: {1}\n", this.productName, this.price);
            return paymentsOutput;
        }
    }
}
