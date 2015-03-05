using System.CodeDom;

namespace ConsoleForum.Commands
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    using ConsoleForum.Entities.Users;
    using ConsoleForum.Contracts;
    using ConsoleForum.Utility;
    using ConsoleForum.Entities.Posts;

    public class MakeBestAnswerCommand : AbstractCommand
    {
        public MakeBestAnswerCommand(IForum forum)
            : base(forum)
        {
        }

        public override void Execute()
        {
            var users = this.Forum.Users;
            var questions = this.Forum.Questions;
            int id = int.Parse(this.Data[1]);

            if (!Forum.IsLogged)
            {
                throw new CommandException(Messages.NotLogged);
            }

            if (Forum.CurrentQuestion == null)
            {
                throw new CommandException(Messages.NoQuestionOpened);
            }

            var isIdvalid = Forum.CurrentQuestion.Answers.FirstOrDefault(a => a.Id == id);

            if (isIdvalid == null)
            {
                throw new CommandException(Messages.NoAnswer);
            }

            var hasPermissiontoMakeBestAnswer = this.Forum.CurrentUser.Questions.FirstOrDefault(q => q.Id == this.Forum.CurrentQuestion.Id);
            var isAdmin = this.Forum.CurrentUser.Id == 1;

            if (hasPermissiontoMakeBestAnswer == null && !isAdmin)
            {
                throw new CommandException(Messages.NoPermission);
            }

            IAnswer currentAnswer = this.Forum.CurrentQuestion.Answers.FirstOrDefault(a => a.Id == id);
            BestAnswers addedBestAnswer = new BestAnswers(id, currentAnswer.Body, currentAnswer.Author);

            this.Forum.Answers.Remove(currentAnswer);
            this.Forum.Answers.Add(addedBestAnswer);
            this.Forum.CurrentQuestion.Answers.Remove(currentAnswer);
            this.Forum.CurrentQuestion.Answers.Add(addedBestAnswer);
            
            this.Forum.Output.AppendLine(string.Format(Messages.BestAnswerSuccess, id));
        }
    }
}
