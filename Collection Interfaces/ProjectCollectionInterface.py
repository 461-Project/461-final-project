class ProjectCollectionInterface:
    #
    # structure of Documents in Project Collection
    # "id" = proj_id
    # "name" = proj_name
    # "description" = proj_description
    # "Resource 1" = checked_out_resource_1
    # "Resource 2" = checked_out_resource_2
    # scalable to include more resources
    #

    # iterate over each document in project collection and add resource field initialized to 0
    def add_resource(self, resource_name):
        raise NotImplementedError

    # get project name
    def get_proj_name(self, proj_id):
        raise NotImplementedError

    # set project name
    def set_proj_name(self, proj_id, name):
        raise NotImplementedError

    # get the description of the project
    def get_description(self, proj_id):
        raise NotImplementedError

    # set the description of the project
    def set_description(self, proj_id, description):
        raise NotImplementedError

    # return how many of a certain item a project has
    def get_checked_out(self, proj_id, resource):
        raise NotImplementedError

    # add to how many of a certain item a project has checked out
    def set_checked_out(self, proj_id, resource_name, qty):
        raise NotImplementedError

    # subtract from how many of a certain item a project has checked out
    def check_in(self, proj_id, resource_name, qty):
        raise NotImplementedError

    # return how many total items a project has across all hardware sets
    def get_total_hardware(self, proj_id):
        raise NotImplementedError

    # see if a project exists
    def check_proj_exists(self, proj_id):
        raise NotImplementedError

    # create a project, check to make sure proj_id doesn't exist
    def create_proj(self, proj_id, name, description):
        raise NotImplementedError

    # delete a project, make sure proj exists
    def delete_proj(self, proj_id):
        raise NotImplementedError






