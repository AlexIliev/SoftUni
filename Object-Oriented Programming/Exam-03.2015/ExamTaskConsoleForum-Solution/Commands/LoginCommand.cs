namespace ConsoleForum.Commands
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    using ConsoleForum.Entities.Users;
    using ConsoleForum.Contracts;
    using ConsoleForum.Utility;

    public class LoginCommand : AbstractCommand
    {
        public LoginCommand(IForum forum)
            : base(forum)
        {
        }

        public override void Execute()
        {
            var users = this.Forum.Users;
            string username = this.Data[1];
            string password = PasswordUtility.Hash(this.Data[2]);

            var currentUser = from element in users
                              where element.Username == username && element.Password == password
                              select element;

            if (currentUser.FirstOrDefault() == null)
            {
                throw new CommandException(Messages.InvalidLoginDetails);
            }

            if (Forum.IsLogged)
            {
                throw new CommandException(Messages.AlreadyLoggedIn);
            }

            Forum.CurrentUser = currentUser.FirstOrDefault();

            this.Forum.Output.AppendLine(
                string.Format(Messages.LoginSuccess, username, users.Last().Id)
            );
        }
    }
}
