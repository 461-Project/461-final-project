class ResourceCollectionInterface:
    #
    # structure of Documents in Resource Collection
    # "name" = resource_name
    # "capacity" = capacity
    # "availability" = availability
    #

    # add new Document to Resource Collection
    def new_resource(self, resource_name, capacity):
        raise NotImplementedError

    # return resource's capacity
    def get_resource_capacity(self, resource_name):
        raise NotImplementedError

    # set the capacity of resource
    def set_resource_capacity(self, resource_name, qty):
        raise NotImplementedError

    # return resource's availability
    def get_resource_availability(self, resource_name):
        raise NotImplementedError

    # set the availability of resource
    def set_resource_availability(self, resource_name, qty):
        raise NotImplementedError
