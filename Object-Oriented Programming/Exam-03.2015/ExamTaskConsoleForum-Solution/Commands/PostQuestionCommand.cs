namespace ConsoleForum.Commands
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    using ConsoleForum.Entities.Users;
    using ConsoleForum.Contracts;
    using ConsoleForum.Utility;
    using ConsoleForum.Entities.Posts;

    public class PostQuestionCommand : AbstractCommand
    {
        public PostQuestionCommand(IForum forum)
            : base(forum)
        {
        }

        public override void Execute()
        {
            var users = this.Forum.Users;
            var questions = this.Forum.Questions;
            string title = this.Data[1];
            string body = this.Data[2];

            if (!Forum.IsLogged)
            {
                throw new CommandException(Messages.NotLogged);
            }

            IQuestion addedQuestion = new Question(Forum.Questions.Count + 1, body, Forum.CurrentUser, title);

            this.Forum.CurrentUser.Questions.Add(addedQuestion);
            this.Forum.Questions.Add(addedQuestion);

            this.Forum.Output.AppendLine(string.Format(Messages.PostQuestionSuccess, addedQuestion.Id));
        }
    }
}