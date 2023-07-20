import os
class GetPath():
    def file_example_global(FILE_EXAMPLE):
        return (os.path.join(os.path.dirname(__file__), FILE_EXAMPLE))