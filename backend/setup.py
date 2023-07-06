from setuptools import setup

setup(
    name='app',
    packages=['app'],
    include_package_data=False,
    install_requires=[
        'flask',
        'flask_restful',
        'flask_cors',
        'flask_httpauth',
        'jwt'
    ],
)