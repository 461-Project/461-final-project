class ResourceCollectionInterface:
    #
    # structure of Documents in Resource Collection
    # "name" = resource_name
    # "capability" = capability
    # "availability" = availability
    #

    # add new Document to Resource Collection
    def new_resource(self, resource_name, capability, availability):
        raise NotImplementedError

    # return resource's capability
    def get_resource_capability(self, resource_name):
        raise NotImplementedError

    # set the capability of resource
    def set_resource_capability(self, resource_name, qty):
        raise NotImplementedError

    # return resource's availability
    def get_resource_availability(self, resource_name):
        raise NotImplementedError

    # set the availability of resource
    def set_resource_availability(self, resource_name, qty):
        raise NotImplementedError
