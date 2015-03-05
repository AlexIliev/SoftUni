using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using  ConsoleForum.Contracts;

namespace ConsoleForum.Entities.Posts
{
    public abstract class Post : IPost
    {
        private int id = 1;
        private string body;
        private IUser author;

        public Post(int id, string body, IUser author)
        {
            this.Id = id;
            this.Body = body;
            this.Author = author;
        }
        
        public int Id
        {
            get
            {
                return this.id;
            }
            set
            {
                this.id = value;
            }
        }

        public string Body
        {
            get
            {
                return this.body;
            }
            set
            {
                this.body = value;
            }
        }

        public IUser Author
        {
            get
            {
                return this.author;
            }
            set
            {
                this.author = value;
            }
        }
    }
}
