class UserCollectionInterface:
    #
    # structure of Documents in User Collection
    # each user will have their own Document in the User Collection
    # "username" = user's username
    # "password" = user's password
    #

    # ensure the username doesn't already exist in the database (check_user_exists)
    # add new Document to User Collection
    def new_user(self, username, password):
        raise NotImplementedError

    # return user's password
    def get_user_password(self, username):
        raise NotImplementedError

    # total number of Documents in User Collection
    def get_total_users(self):
        raise NotImplementedError

    # see if username exists
    def check_user_exists(self, username, password):
        raise NotImplementedError
